import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Circle,
  Code2,
  ExternalLink,
  GraduationCap,
  PlayCircle,
  Target,
  Youtube
} from 'lucide-react';

import api from '../../services/api';

/* =========================================================
   LEARNING RESOURCES
========================================================= */

const learningResources = {
  java: {
    title: 'Java',
    topics: [
      'Java fundamentals',
      'Object-Oriented Programming',
      'Collections Framework',
      'Exception Handling',
      'Streams and Lambda Expressions'
    ],
    gfg: 'https://www.geeksforgeeks.org/java/',
    video:
      'https://www.youtube.com/results?search_query=java+tutorial+for+beginners',
    practice:
      'Build a Student Management System using Java OOP and Collections.'
  },

  javascript: {
    title: 'JavaScript',
    topics: [
      'Variables and data types',
      'Functions',
      'Arrays and objects',
      'ES6 features',
      'Async/Await and Promises'
    ],
    gfg: 'https://www.geeksforgeeks.org/javascript/',
    video:
      'https://www.youtube.com/results?search_query=javascript+tutorial+for+beginners',
    practice:
      'Build a small interactive To-Do List using JavaScript.'
  },

  react: {
    title: 'React',
    topics: [
      'Components',
      'JSX',
      'Props and State',
      'Hooks',
      'Forms and Events'
    ],
    gfg:
      'https://www.geeksforgeeks.org/reactjs/reactjs-basics-concepts-complete-reference/',
    video:
      'https://www.youtube.com/results?search_query=react+js+tutorial+for+beginners',
    practice:
      'Build a small React internship dashboard with cards and filters.'
  },

  'spring boot': {
    title: 'Spring Boot',
    topics: [
      'Spring Boot fundamentals',
      'REST APIs',
      'Dependency Injection',
      'Spring Data JPA',
      'Exception Handling'
    ],
    gfg:
      'https://www.geeksforgeeks.org/springboot/introduction-to-spring-boot/',
    video:
      'https://www.youtube.com/results?search_query=spring+boot+tutorial+for+beginners',
    practice:
      'Create a Spring Boot REST API for managing internship records.'
  },

  'spring security': {
    title: 'Spring Security',
    topics: [
      'Authentication',
      'Authorization',
      'Roles and Permissions',
      'JWT Authentication',
      'Password Encryption'
    ],
    gfg:
      'https://www.geeksforgeeks.org/spring-security/introduction-to-spring-security/',
    video:
      'https://www.youtube.com/results?search_query=spring+security+jwt+tutorial',
    practice:
      'Implement JWT login and role-based authorization in a Spring Boot API.'
  },

  sql: {
    title: 'SQL',
    topics: [
      'SELECT queries',
      'Filtering and Sorting',
      'Joins',
      'GROUP BY and Aggregation',
      'Subqueries'
    ],
    gfg: 'https://www.geeksforgeeks.org/sql-tutorial/',
    video:
      'https://www.youtube.com/results?search_query=sql+tutorial+for+beginners',
    practice:
      'Design a student database and write 10 useful SQL queries.'
  },

  postgresql: {
    title: 'PostgreSQL',
    topics: [
      'Database fundamentals',
      'Tables and Relationships',
      'SQL Queries',
      'Indexes',
      'Transactions'
    ],
    gfg: 'https://www.geeksforgeeks.org/postgresql-tutorial/',
    video:
      'https://www.youtube.com/results?search_query=postgresql+tutorial+for+beginners',
    practice:
      'Create a PostgreSQL database for students, internships and applications.'
  },

  git: {
    title: 'Git',
    topics: [
      'Git basics',
      'Commits',
      'Branches',
      'Merge and Rebase',
      'GitHub workflow'
    ],
    gfg: 'https://www.geeksforgeeks.org/git/',
    video:
      'https://www.youtube.com/results?search_query=git+github+tutorial+for+beginners',
    practice:
      'Create a GitHub repository and practice branching, merging and pull requests.'
  },

  html: {
    title: 'HTML',
    topics: [
      'HTML structure',
      'Forms',
      'Tables',
      'Semantic HTML',
      'Accessibility basics'
    ],
    gfg: 'https://www.geeksforgeeks.org/html/',
    video:
      'https://www.youtube.com/results?search_query=html+tutorial+for+beginners',
    practice:
      'Build a responsive internship registration form using HTML.'
  },

  css: {
    title: 'CSS',
    topics: [
      'Selectors',
      'Box Model',
      'Flexbox',
      'CSS Grid',
      'Responsive Design'
    ],
    gfg: 'https://www.geeksforgeeks.org/css/',
    video:
      'https://www.youtube.com/results?search_query=css+tutorial+for+beginners',
    practice:
      'Design a responsive internship recommendation card layout.'
  },

  python: {
    title: 'Python',
    topics: [
      'Python fundamentals',
      'Functions',
      'Lists and Dictionaries',
      'Object-Oriented Programming',
      'File Handling'
    ],
    gfg: 'https://www.geeksforgeeks.org/python-programming-language/',
    video:
      'https://www.youtube.com/results?search_query=python+tutorial+for+beginners',
    practice:
      'Build a Python internship eligibility checker.'
  },

  mongodb: {
    title: 'MongoDB',
    topics: [
      'Documents and Collections',
      'CRUD operations',
      'Queries',
      'Indexes',
      'Aggregation'
    ],
    gfg: 'https://www.geeksforgeeks.org/mongodb/',
    video:
      'https://www.youtube.com/results?search_query=mongodb+tutorial+for+beginners',
    practice:
      'Build a MongoDB collection for storing internship applications.'
  }
};


/* =========================================================
   NORMALIZE SKILL NAMES
========================================================= */

const normalizeSkill = (skill) => {
  if (!skill) return '';

  const value = String(skill)
    .toLowerCase()
    .trim()
    .replace(/[._-]/g, ' ');

  if (value === 'reactjs' || value === 'react js') return 'react';
  if (value === 'javascript' || value === 'js') return 'javascript';
  if (value === 'springboot' || value === 'spring boot') return 'spring boot';
  if (value === 'springsecurity' || value === 'spring security') {
    return 'spring security';
  }
  if (value === 'postgres' || value === 'postgres sql') return 'postgresql';
  if (value === 'mongo db') return 'mongodb';

  return value;
};


/* =========================================================
   EXTRACT SKILL NAME FROM DIFFERENT API SHAPES
========================================================= */

const getSkillName = (skill) => {
  if (!skill) return '';

  if (typeof skill === 'string') {
    return skill;
  }

  return (
    skill.skillName ||
    skill.name ||
    skill.title ||
    skill.skill ||
    ''
  );
};


/* =========================================================
   EXTRACT INTERNSHIP SKILLS
========================================================= */

const getInternshipSkills = (internship) => {
  if (!internship) return [];

  let skills = [];

  if (Array.isArray(internship.skillNames)) {
    skills = internship.skillNames;
  } else if (Array.isArray(internship.skills)) {
    skills = internship.skills.map(getSkillName);
  } else if (typeof internship.requiredSkills === 'string') {
    skills = internship.requiredSkills.split(',');
  }

  return [...new Set(
    skills
      .map(getSkillName)
      .map((skill) => skill.trim())
      .filter(Boolean)
  )];
};


/* =========================================================
   EXTRACT STUDENT SKILLS
========================================================= */

const getStudentSkills = (profile) => {
  if (!profile) return [];

  let skills = [];

  if (Array.isArray(profile.skills)) {
    skills = profile.skills.map(getSkillName);
  }

  if (Array.isArray(profile.studentSkills)) {
    skills = [...skills, ...profile.studentSkills.map(getSkillName)];
  }

  return [...new Set(
    skills
      .map((skill) => skill.trim())
      .filter(Boolean)
  )];
};


/* =========================================================
   COMPONENT
========================================================= */

const PreparationPlan = () => {
  const [searchParams] = useSearchParams();

  const internshipId = searchParams.get('internshipId');

  const [internship, setInternship] = useState(null);
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [completedSkills, setCompletedSkills] = useState({});


  /* =======================================================
     LOAD DATA
  ======================================================= */

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError('');

        const user = JSON.parse(localStorage.getItem('user'));

        if (!user?.id) {
          setError('Please login to create a preparation plan.');
          return;
        }

        const [internshipResponse, profileResponse] =
          await Promise.all([
            api.get(`/internships/${internshipId}`),
           api.get('/students/me')
          ]);

        setInternship(internshipResponse.data);
        setProfile(profileResponse.data);

        /* Load saved progress */
        const savedProgress = localStorage.getItem(
          `preparation-progress-${internshipId}-${user.id}`
        );

        if (savedProgress) {
          setCompletedSkills(JSON.parse(savedProgress));
        }

      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
          'Unable to load preparation plan.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (internshipId) {
      loadData();
    } else {
      setError('No internship was selected.');
      setLoading(false);
    }
  }, [internshipId]);


  /* =======================================================
     SKILL ANALYSIS
  ======================================================= */

  const internshipSkills = useMemo(
    () => getInternshipSkills(internship),
    [internship]
  );

  const studentSkills = useMemo(
    () => getStudentSkills(profile),
    [profile]
  );

  const studentSkillSet = useMemo(
    () =>
      new Set(
        studentSkills.map(normalizeSkill)
      ),
    [studentSkills]
  );

  const matchedSkills = useMemo(() => {
    return internshipSkills.filter((skill) =>
      studentSkillSet.has(normalizeSkill(skill))
    );
  }, [internshipSkills, studentSkillSet]);

  const missingSkills = useMemo(() => {
    return internshipSkills.filter(
      (skill) =>
        !studentSkillSet.has(normalizeSkill(skill))
    );
  }, [internshipSkills, studentSkillSet]);


  /* =======================================================
     PROGRESS
  ======================================================= */

  const completedCount = missingSkills.filter(
    (skill) => completedSkills[normalizeSkill(skill)]
  ).length;

  const progress =
    missingSkills.length === 0
      ? 100
      : Math.round(
          (completedCount / missingSkills.length) * 100
        );


  /* =======================================================
     MARK COMPLETE
  ======================================================= */

  const toggleCompleted = (skill) => {
    const key = normalizeSkill(skill);

    const updated = {
      ...completedSkills,
      [key]: !completedSkills[key]
    };

    setCompletedSkills(updated);

    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.id) {
      localStorage.setItem(
        `preparation-progress-${internshipId}-${user.id}`,
        JSON.stringify(updated)
      );
    }
  };


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem' }}>
        <div className="card">
          <h2>Creating your preparation plan...</h2>
          <p>
            We are comparing your profile with the internship
            requirements.
          </p>
        </div>
      </div>
    );
  }


  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <div className="container" style={{ padding: '3rem' }}>
        <div className="card">
          <h2>Preparation Plan</h2>

          <div className="alert alert-danger">
            {error}
          </div>

          <Link
            to="/student/internships"
            className="btn btn-primary"
          >
            <ArrowLeft size={18} />
            Back to Internships
          </Link>
        </div>
      </div>
    );
  }


  /* =======================================================
     MAIN UI
  ======================================================= */

  return (
    <div className="container" style={{ paddingBottom: '3rem' }}>

      {/* Back */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          to={`/student/internships/${internship.id}`}
          className="btn btn-secondary"
        >
          <ArrowLeft size={18} />
          Back to Internship
        </Link>
      </div>


      {/* Header */}
      <div
        className="card"
        style={{
          marginBottom: '1.5rem',
          background:
            'linear-gradient(135deg, #eef4ff, #ffffff)'
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start'
          }}
        >
          <div
            style={{
              width: '55px',
              height: '55px',
              borderRadius: '14px',
              background: '#dbeafe',
              color: '#1d4ed8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <GraduationCap size={30} />
          </div>

          <div>
            <h1 style={{ marginBottom: '0.35rem' }}>
              Internship Preparation Hub
            </h1>

            <h3
              style={{
                marginTop: 0,
                color: '#475467'
              }}
            >
              {internship?.title || 'Selected Internship'}
            </h3>

            <p style={{ marginBottom: 0 }}>
              Identify your skill gaps, learn the required skills,
              practice them and become internship-ready.
            </p>
          </div>
        </div>
      </div>


      {/* Progress */}
      <div
        className="card"
        style={{ marginBottom: '1.5rem' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.7rem'
          }}
        >
          <div>
            <strong>Preparation Progress</strong>
            <div
              style={{
                color: '#667085',
                fontSize: '0.9rem'
              }}
            >
              {completedCount} of {missingSkills.length}{' '}
              missing skills completed
            </div>
          </div>

          <strong
            style={{
              fontSize: '1.4rem',
              color: '#24469a'
            }}
          >
            {progress}%
          </strong>
        </div>

        <div
          style={{
            height: '12px',
            background: '#e5e7eb',
            borderRadius: '20px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: '#24469a',
              borderRadius: '20px',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
      </div>


      {/* Matched Skills */}
      <div
        className="card"
        style={{ marginBottom: '1.5rem' }}
      >
        <div className="card-header">
          <h2>
            <CheckCircle2 size={22} />
            Your Matching Skills
          </h2>
        </div>

        {matchedSkills.length > 0 ? (
          <div
            style={{
              display: 'flex',
              gap: '0.6rem',
              flexWrap: 'wrap'
            }}
          >
            {matchedSkills.map((skill) => (
              <span
                key={skill}
                className="skill-tag skill-matching"
              >
                <CheckCircle2 size={15} />
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p>
            No direct matching skills were found in your current
            profile.
          </p>
        )}
      </div>


      {/* Missing Skills */}
      <div
        className="card"
        style={{ marginBottom: '1.5rem' }}
      >
        <div className="card-header">
          <h2>
            <Target size={22} />
            Skills You Need to Learn
          </h2>
        </div>

        {missingSkills.length === 0 ? (
          <div className="alert alert-success">
            <CheckCircle2 size={18} />
            Great! Your profile already contains all the required
            skills for this internship.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {missingSkills.map((skill) => {
              const normalized = normalizeSkill(skill);
              const resource =
                learningResources[normalized];

              const completed =
                completedSkills[normalized];

              return (
                <div
                  key={skill}
                  style={{
                    border: '1px solid #dbe3ef',
                    borderRadius: '14px',
                    padding: '1.25rem',
                    background: completed
                      ? '#f0fdf4'
                      : '#ffffff'
                  }}
                >

                  {/* Skill Header */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}
                  >
                    <div>
                      <h3 style={{ margin: 0 }}>
                        {resource?.title || skill}
                      </h3>

                      <span
                        style={{
                          color: '#b45309',
                          fontSize: '0.85rem'
                        }}
                      >
                        Skill Gap
                      </span>
                    </div>

                    {completed ? (
                      <CheckCircle2
                        size={27}
                        color="#16a34a"
                      />
                    ) : (
                      <Circle
                        size={27}
                        color="#94a3b8"
                      />
                    )}
                  </div>


                  {/* Topics */}
                  {resource ? (
                    <>
                      <div style={{ marginBottom: '1rem' }}>
                        <strong
                          style={{
                            display: 'flex',
                            gap: '0.4rem',
                            alignItems: 'center',
                            marginBottom: '0.5rem'
                          }}
                        >
                          <BookOpen size={18} />
                          What to Learn
                        </strong>

                        <ul
                          style={{
                            paddingLeft: '1.25rem',
                            margin: 0
                          }}
                        >
                          {resource.topics.map((topic) => (
                            <li
                              key={topic}
                              style={{
                                marginBottom: '0.3rem'
                              }}
                            >
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>


                      {/* Resources */}
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.6rem',
                          flexWrap: 'wrap',
                          marginBottom: '1rem'
                        }}
                      >
                        <a
                          href={resource.gfg}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}
                        >
                          <BookOpen size={16} />
                          GFG
                          <ExternalLink size={13} />
                        </a>

                        <a
                          href={resource.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}
                        >
                          <Youtube size={17} />
                          Videos
                          <ExternalLink size={13} />
                        </a>
                      </div>


                      {/* Practice */}
                      <div
                        style={{
                          background: '#f8fafc',
                          borderRadius: '10px',
                          padding: '0.85rem',
                          marginBottom: '1rem'
                        }}
                      >
                        <strong
                          style={{
                            display: 'flex',
                            gap: '0.4rem',
                            alignItems: 'center',
                            marginBottom: '0.4rem'
                          }}
                        >
                          <Code2 size={18} />
                          Practice Task
                        </strong>

                        <span
                          style={{
                            color: '#475467',
                            fontSize: '0.9rem'
                          }}
                        >
                          {resource.practice}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div
                      style={{
                        background: '#f8fafc',
                        padding: '1rem',
                        borderRadius: '10px',
                        marginBottom: '1rem'
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          color: '#475467'
                        }}
                      >
                        Learn the fundamentals of{' '}
                        <strong>{skill}</strong>, practice
                        interview questions and build a small
                        project using this skill.
                      </p>

                      <a
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                          `${skill} tutorial for beginners`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        style={{
                          marginTop: '0.8rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem'
                        }}
                      >
                        <PlayCircle size={16} />
                        Find Videos
                      </a>
                    </div>
                  )}


                  {/* Complete */}
                  <button
                    type="button"
                    onClick={() => toggleCompleted(skill)}
                    className={
                      completed
                        ? 'btn btn-secondary'
                        : 'btn btn-primary'
                    }
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {completed ? (
                      <>
                        <CheckCircle2 size={18} />
                        Completed
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={18} />
                        Mark as Completed
                      </>
                    )}
                  </button>

                </div>
              );
            })}
          </div>
        )}
      </div>


      {/* Final message */}
      {progress === 100 && (
        <div
          className="card"
          style={{
            textAlign: 'center',
            background: '#f0fdf4',
            border: '1px solid #bbf7d0'
          }}
        >
          <CheckCircle2
            size={45}
            color="#16a34a"
          />

          <h2>You're Internship Ready! 🎉</h2>

          <p>
            You have completed the preparation plan for this
            internship.
          </p>

          <Link
            to={`/student/internships/${internship.id}`}
            className="btn btn-primary"
          >
            Continue to Internship
          </Link>
        </div>
      )}

    </div>
  );
};

export default PreparationPlan;