import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../../services/api';

import {
  Upload,
  FileText,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Send,
  Loader2,
  XCircle
} from 'lucide-react';

import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.js?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const ResumeRecommendations = () => {
  const [searchParams] = useSearchParams();
  const internshipId = searchParams.get('internshipId');

  const [file, setFile] = useState(null);
  const [internships, setInternships] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [loadingInternships, setLoadingInternships] = useState(true);
  const [processing, setProcessing] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [appliedIds, setAppliedIds] = useState(new Set());
  const [applyingId, setApplyingId] = useState(null);

  useEffect(() => {
    loadInternships();
    loadApplications();
  }, []);

  const loadInternships = async () => {
    try {
      setLoadingInternships(true);

      const response = await api.get('/internships');

      setInternships(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (err) {
      console.error('Failed to load internships:', err);
      setError('Unable to load internships.');
    } finally {
      setLoadingInternships(false);
    }
  };

  const loadApplications = async () => {
    try {
      const response = await api.get('/applications');

      const ids = new Set(
        (response.data || []).map(
          application => application.internshipId
        )
      );

      setAppliedIds(ids);
    } catch (err) {
      console.error('Failed to load applications:', err);
    }
  };

  const extractPdfText = async (selectedFile) => {
    const arrayBuffer = await selectedFile.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer
    }).promise;

    let fullText = '';

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);

      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map(item => item.str)
        .join(' ');

      fullText += ` ${pageText}`;
    }

    return fullText;
  };

  const extractTextFile = async (selectedFile) => {
    return await selectedFile.text();
  };

  const normalize = (text) => {
    return (text || '')
      .toLowerCase()
      .replace(/[^a-z0-9+#.\- ]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const calculateMatch = (internship, resumeText) => {
    const resume = normalize(resumeText);

    const title = normalize(internship.title);
    const industry = normalize(internship.industry);
    const description = normalize(internship.description);

    const skills =
      internship.skillNames ||
      internship.skills?.map(skill => skill.skillName) ||
      [];

    const matchedSkills = [];
    const missingSkills = [];

    skills.forEach(skill => {
      const normalizedSkill = normalize(skill);

      if (
        normalizedSkill &&
        resume.includes(normalizedSkill)
      ) {
        matchedSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    });

    let skillScore = 0;

    if (skills.length > 0) {
      skillScore = Math.round(
        (matchedSkills.length / skills.length) * 70
      );
    } else {
      skillScore = 40;
    }

    let roleScore = 0;

    const titleWords = title
      .split(' ')
      .filter(word => word.length >= 3);

    const matchingTitleWords = titleWords.filter(word =>
      resume.includes(word)
    );

    if (titleWords.length > 0) {
      roleScore = Math.round(
        (matchingTitleWords.length / titleWords.length) * 15
      );
    }

    let industryScore = 0;

    if (
      industry &&
      resume.includes(industry)
    ) {
      industryScore = 10;
    } else if (
      industry &&
      description.includes(industry) &&
      resume.includes(industry.split(' ')[0])
    ) {
      industryScore = 7;
    }

    let descriptionScore = 0;

    const descriptionWords = description
      .split(' ')
      .filter(word => word.length >= 5)
      .slice(0, 50);

    const matchingDescriptionWords =
      descriptionWords.filter(word =>
        resume.includes(word)
      );

    if (descriptionWords.length > 0) {
      descriptionScore = Math.min(
        5,
        Math.round(
          (matchingDescriptionWords.length /
            descriptionWords.length) *
            5
        )
      );
    }

    const totalScore = Math.min(
      100,
      skillScore +
        roleScore +
        industryScore +
        descriptionScore
    );

    return {
      ...internship,
      resumeMatchScore: totalScore,
      matchedSkills,
      missingSkills
    };
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    setError('');
    setSuccess('');
    setRecommendations([]);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const allowedTypes = [
      'application/pdf',
      'text/plain'
    ];

    const extension = selectedFile.name
      .split('.')
      .pop()
      .toLowerCase();

    if (
      !allowedTypes.includes(selectedFile.type) &&
      !['pdf', 'txt'].includes(extension)
    ) {
      setError(
        'Please upload a PDF or TXT resume.'
      );
      setFile(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError(
        'Resume file must be smaller than 5 MB.'
      );
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleAnalyzeResume = async () => {
    if (!file) {
      setError('Please select your resume first.');
      return;
    }

    if (internships.length === 0) {
      setError('No internships are available for matching.');
      return;
    }

    try {
      setProcessing(true);
      setError('');
      setSuccess('');
      setRecommendations([]);

      let resumeText = '';

      const extension = file.name
        .split('.')
        .pop()
        .toLowerCase();

      if (extension === 'pdf') {
        resumeText = await extractPdfText(file);
      } else {
        resumeText = await extractTextFile(file);
      }

      if (!resumeText || resumeText.trim().length < 30) {
        setError(
          'Could not extract enough text from this resume. Please use a text-based PDF.'
        );
        return;
      }

      let results = internships.map(
        internship =>
          calculateMatch(internship, resumeText)
      );

      results.sort(
        (a, b) =>
          b.resumeMatchScore -
          a.resumeMatchScore
      );

      if (internshipId) {
        results = results.filter(
          internship =>
            String(internship.id) ===
            String(internshipId)
        );
      }

      setRecommendations(results);

      setSuccess(
        internshipId
          ? 'Resume analyzed successfully for this internship.'
          : 'Resume analyzed successfully. Your fastest matching internships are shown below.'
      );
    } catch (err) {
      console.error(
        'Resume analysis failed:',
        err
      );

      setError(
        'Unable to read this resume. Please try another PDF.'
      );
    } finally {
      setProcessing(false);
    }
  };

  const handleApplyThroughResume = async (
    internship
  ) => {
    try {
      setApplyingId(internship.id);
      setError('');
      setSuccess('');

      await api.post(
        `/applications/${internship.id}`
      );

      setAppliedIds(prev => {
        const next = new Set(prev);
        next.add(internship.id);
        return next;
      });

      setSuccess(
        `Application submitted successfully for ${internship.title}.`
      );
    } catch (err) {
      console.error(
        'Resume application failed:',
        err
      );

      setError(
        err.response?.data?.message ||
        'Unable to submit application.'
      );
    } finally {
      setApplyingId(null);
    }
  };

  const getScoreClass = (score) => {
    if (score >= 80) return '#16a34a';
    if (score >= 60) return '#2563eb';
    if (score >= 40) return '#d97706';
    return '#dc2626';
  };

  if (loadingInternships) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '4rem'
        }}
      >
        <Loader2
          size={35}
          style={{
            animation: 'spin 1s linear infinite'
          }}
        />
        <p style={{ marginTop: '1rem' }}>
          Preparing resume matching...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '0 auto'
      }}
    >

      {/* HEADER */}
      <div
        className="card"
        style={{
          marginBottom: '1.5rem',
          background:
            'linear-gradient(135deg, #eff6ff, #ffffff)'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div
            style={{
              background: '#dbeafe',
              color: '#2563eb',
              padding: '0.85rem',
              borderRadius: '12px'
            }}
          >
            <Sparkles size={30} />
          </div>

          <div>
            <h1
              style={{
                fontSize: '1.8rem',
                color: 'var(--dark)',
                marginBottom: '0.3rem'
              }}
            >
              Fast Resume Recommendation
            </h1>

            <p
              style={{
                color: 'var(--text-muted)'
              }}
            >
              Upload your resume and instantly find
              internships matching your skills.
            </p>
          </div>
        </div>
      </div>

      {/* UPLOAD CARD */}
      <div
        className="card"
        style={{
          marginBottom: '1.5rem'
        }}
      >
        <h2
          style={{
            fontSize: '1.25rem',
            marginBottom: '0.5rem'
          }}
        >
          Upload Your Resume
        </h2>

        <p
          style={{
            color: 'var(--text-muted)',
            marginBottom: '1rem'
          }}
        >
          Supported formats: PDF and TXT. Maximum size: 5 MB.
        </p>

        <label
          htmlFor="resume-upload"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #93c5fd',
            borderRadius: '12px',
            padding: '2rem',
            cursor: 'pointer',
            background: '#f8fbff'
          }}
        >
          <Upload
            size={38}
            color="#2563eb"
          />

          <strong
            style={{
              marginTop: '0.75rem'
            }}
          >
            Choose Resume
          </strong>

          <span
            style={{
              color: 'var(--text-muted)',
              marginTop: '0.3rem'
            }}
          >
            Click here to select your PDF resume
          </span>

          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.txt,application/pdf,text/plain"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>

        {file && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginTop: '1rem',
              padding: '0.85rem',
              background: '#f0fdf4',
              borderRadius: '8px'
            }}
          >
            <FileText
              size={22}
              color="#16a34a"
            />

            <div style={{ flex: 1 }}>
              <strong>{file.name}</strong>

              <div
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)'
                }}
              >
                {(file.size / 1024).toFixed(1)} KB
              </div>
            </div>

            <CheckCircle
              size={22}
              color="#16a34a"
            />
          </div>
        )}

        <button
          type="button"
          onClick={handleAnalyzeResume}
          className="btn btn-primary"
          disabled={!file || processing}
          style={{
            marginTop: '1rem',
            width: '100%'
          }}
        >
          {processing ? (
            <>
              <Loader2
                size={18}
                style={{
                  animation:
                    'spin 1s linear infinite'
                }}
              />
              Analyzing Resume...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Get Fast Recommendations
            </>
          )}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div
          className="alert alert-danger"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}
        >
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* SUCCESS */}
      {success && (
        <div
          className="alert alert-success"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}
        >
          <CheckCircle size={18} />
          {success}
        </div>
      )}

      {/* RESULTS */}
      {recommendations.length > 0 && (
        <div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}
          >
            <div>
              <h2>
                Resume Matched Internships
              </h2>

              <p
                style={{
                  color: 'var(--text-muted)',
                  marginTop: '0.25rem'
                }}
              >
                Ranked using skills, role and industry
                information extracted from your resume.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            {recommendations.map(
              internship => (
                <div
                  key={internship.id}
                  className="card"
                  style={{
                    border:
                      '1px solid #e2e8f0'
                  }}
                >

                  <div
                    style={{
                      display: 'flex',
                      justifyContent:
                        'space-between',
                      gap: '1rem',
                      flexWrap: 'wrap'
                    }}
                  >

                    <div style={{ flex: 1 }}>

                      <h3
                        style={{
                          color:
                            'var(--dark)'
                        }}
                      >
                        {internship.title}
                      </h3>

                      <p
                        style={{
                          color:
                            'var(--primary)',
                          fontWeight: '600',
                          marginTop: '0.25rem'
                        }}
                      >
                        {internship.company}
                      </p>

                      <p
                        style={{
                          color:
                            'var(--text-muted)',
                          marginTop: '0.5rem'
                        }}
                      >
                        {internship.industry}
                        {' • '}
                        {internship.workMode}
                        {' • '}
                        {internship.location ||
                          'Remote'}
                      </p>

                    </div>

                    {/* SCORE */}
                    <div
                      style={{
                        minWidth: '115px',
                        textAlign: 'center',
                        padding: '0.75rem',
                        borderRadius: '12px',
                        background:
                          '#f8fafc'
                      }}
                    >
                      <div
                        style={{
                          fontSize:
                            '1.8rem',
                          fontWeight: '800',
                          color:
                            getScoreClass(
                              internship.resumeMatchScore
                            )
                        }}
                      >
                        {internship.resumeMatchScore}%
                      </div>

                      <div
                        style={{
                          fontSize:
                            '0.75rem',
                          color:
                            'var(--text-muted)'
                        }}
                      >
                        Resume Match
                      </div>
                    </div>
                  </div>

                  {/* MATCHED SKILLS */}
                  {internship.matchedSkills
                    ?.length > 0 && (
                    <div
                      style={{
                        marginTop: '1rem'
                      }}
                    >
                      <strong>
                        Matching Skills
                      </strong>

                      <div
                        style={{
                          display: 'flex',
                          flexWrap:
                            'wrap',
                          gap: '0.4rem',
                          marginTop:
                            '0.5rem'
                        }}
                      >
                        {internship.matchedSkills.map(
                          (skill, index) => (
                            <span
                              key={index}
                              className="badge badge-success"
                            >
                              ✓ {skill}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* MISSING SKILLS */}
                  {internship.missingSkills
                    ?.length > 0 && (
                    <div
                      style={{
                        marginTop: '0.75rem'
                      }}
                    >
                      <strong>
                        Skills to Improve
                      </strong>

                      <div
                        style={{
                          display: 'flex',
                          flexWrap:
                            'wrap',
                          gap: '0.4rem',
                          marginTop:
                            '0.5rem'
                        }}
                      >
                        {internship.missingSkills.map(
                          (skill, index) => (
                            <span
                              key={index}
                              className="badge badge-secondary"
                            >
                              {skill}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* ACTIONS */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      marginTop: '1.25rem',
                      flexWrap: 'wrap'
                    }}
                  >

                    <Link
                      to={`/student/internships/${internship.id}`}
                      className="btn btn-secondary"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </Link>

                    {appliedIds.has(
                      internship.id
                    ) ? (
                      <button
                        className="btn btn-success"
                        disabled
                      >
                        <CheckCircle size={16} />
                        Already Applied
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleApplyThroughResume(
                            internship
                          )
                        }
                        className="btn btn-primary"
                        disabled={
                          applyingId ===
                          internship.id
                        }
                      >
                        {applyingId ===
                        internship.id ? (
                          <>
                            <Loader2
                              size={16}
                              style={{
                                animation:
                                  'spin 1s linear infinite'
                              }}
                            />
                            Applying...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Apply Through Resume
                          </>
                        )}
                      </button>
                    )}

                  </div>

                </div>
              )
            )}
          </div>

        </div>
      )}

      {/* NO RESULTS */}
      {!processing &&
        file &&
        recommendations.length === 0 &&
        success === '' && (
          <div
            className="card"
            style={{
              textAlign: 'center',
              padding: '2rem'
            }}
          >
            <XCircle
              size={42}
              color="#dc2626"
            />

            <h3
              style={{
                marginTop: '0.75rem'
              }}
            >
              No matching internship found
            </h3>

            <p
              style={{
                color: 'var(--text-muted)',
                marginTop: '0.5rem'
              }}
            >
              Try another resume or browse all internships.
            </p>
          </div>
        )}
    </div>
  );
};

export default ResumeRecommendations;