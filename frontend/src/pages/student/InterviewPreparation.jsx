import React, { useState } from 'react';
import axios from 'axios';
import {
  Sparkles,
  Brain,
  Code2,
  Briefcase,
  UserRound,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Target,
  Trophy,
  Play,
  RefreshCw
} from 'lucide-react';

const InterviewPreparation = () => {
  const [role, setRole] = useState('Java Developer');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [visibleAnswers, setVisibleAnswers] = useState({});

  const generateQuestions = async () => {
    try {
      setLoading(true);
      setError('');
      setVisibleAnswers({});

      const token = localStorage.getItem('token');

      const response = await axios.get(
        'http://localhost:8080/api/interview/questions',
        {
          params: {
            role: role
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setQuestions(response.data || []);
    } catch (err) {
      console.error(err);
      setError(
        'Unable to load interview questions. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleAnswer = (index) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getCategoryIcon = (category) => {
    if (category === 'Technical') {
      return <Code2 size={21} />;
    }

    if (category === 'Project') {
      return <Briefcase size={21} />;
    }

    return <UserRound size={21} />;
  };

  const getCategoryColor = (category) => {
    if (category === 'Technical') {
      return {
        background: '#eff6ff',
        color: '#2563eb',
        border: '#bfdbfe'
      };
    }

    if (category === 'Project') {
      return {
        background: '#f5f3ff',
        color: '#7c3aed',
        border: '#ddd6fe'
      };
    }

    return {
      background: '#ecfdf5',
      color: '#059669',
      border: '#a7f3d0'
    };
  };

  const getDifficultyStyle = (difficulty) => {
    if (difficulty === 'Easy') {
      return {
        background: '#dcfce7',
        color: '#166534'
      };
    }

    if (difficulty === 'Medium') {
      return {
        background: '#fef3c7',
        color: '#92400e'
      };
    }

    return {
      background: '#fee2e2',
      color: '#991b1b'
    };
  };

  const technicalCount = questions.filter(
    (q) => q.category === 'Technical'
  ).length;

  const projectCount = questions.filter(
    (q) => q.category === 'Project'
  ).length;

  const hrCount = questions.filter(
    (q) => q.category === 'HR'
  ).length;

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)',
        padding: '2rem 1rem 4rem'
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto'
        }}
      >

        {/* =====================================================
            HERO
        ====================================================== */}

        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '26px',
            padding: '2.5rem',
            marginBottom: '1.5rem',
            color: '#fff',
            background:
              'linear-gradient(135deg, #312e81 0%, #4f46e5 45%, #7c3aed 100%)',
            boxShadow:
              '0 20px 50px rgba(79, 70, 229, 0.25)'
          }}
        >

          {/* Decorative circles */}

          <div
            style={{
              position: 'absolute',
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              right: '-70px',
              top: '-80px'
            }}
          />

          <div
            style={{
              position: 'absolute',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              left: '-50px',
              bottom: '-50px'
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1
            }}
          >

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.4rem 0.75rem',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.13)',
                border:
                  '1px solid rgba(255,255,255,0.18)',
                fontSize: '0.78rem',
                fontWeight: '700',
                marginBottom: '1rem'
              }}
            >
              <Sparkles size={15} />
              AI Powered Interview Coach
            </div>

            <h1
              style={{
                color: '#fff',
                fontSize:
                  'clamp(2rem, 5vw, 3rem)',
                marginBottom: '0.7rem',
                lineHeight: 1.15
              }}
            >
              Ace Your Interview 🎯
            </h1>

            <p
              style={{
                color: '#e0e7ff',
                fontSize: '1rem',
                maxWidth: '700px',
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}
            >
              Practice realistic technical, project and HR
              questions tailored to your internship role.
              Build confidence before the real interview.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '0.7rem',
                flexWrap: 'wrap'
              }}
            >

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '0.55rem 0.8rem',
                  borderRadius: '10px',
                  fontSize: '0.82rem'
                }}
              >
                <Brain size={17} />
                Role-based questions
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '0.55rem 0.8rem',
                  borderRadius: '10px',
                  fontSize: '0.82rem'
                }}
              >
                <Target size={17} />
                Technical + HR
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '0.55rem 0.8rem',
                  borderRadius: '10px',
                  fontSize: '0.82rem'
                }}
              >
                <Trophy size={17} />
                Internship focused
              </div>

            </div>
          </div>
        </section>

        {/* =====================================================
            ROLE SELECTION
        ====================================================== */}

        <section
          style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            border: '1px solid #e2e8f0',
            boxShadow:
              '0 10px 30px rgba(15,23,42,0.06)'
          }}
        >

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              marginBottom: '1rem'
            }}
          >

            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#ede9fe',
                color: '#7c3aed'
              }}
            >
              <Brain size={22} />
            </div>

            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '1.15rem'
                }}
              >
                Choose Your Interview Role
              </h2>

              <p
                style={{
                  margin: '0.25rem 0 0',
                  color: '#64748b',
                  fontSize: '0.82rem'
                }}
              >
                Select the role you are preparing for.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '0.8rem',
              flexWrap: 'wrap'
            }}
          >

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                flex: 1,
                minWidth: '240px',
                padding: '13px 14px',
                borderRadius: '11px',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            >
              <option>Java Developer</option>
              <option>React Developer</option>
              <option>Frontend Developer</option>
              <option>Data Scientist</option>
              <option>Data Analyst</option>
              <option>Software Developer</option>
            </select>

            <button
              onClick={generateQuestions}
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '13px 22px',
                border: 'none',
                borderRadius: '11px',
                color: '#fff',
                background:
                  'linear-gradient(135deg, #4f46e5, #7c3aed)',
                fontWeight: '700',
                cursor: loading
                  ? 'not-allowed'
                  : 'pointer',
                minWidth: '190px',
                boxShadow:
                  '0 8px 20px rgba(79,70,229,0.2)'
              }}
            >
              {loading ? (
                <>
                  <RefreshCw
                    size={18}
                    style={{
                      animation:
                        'spin 1s linear infinite'
                    }}
                  />
                  Generating...
                </>
              ) : (
                <>
                  <Play size={18} />
                  Start Preparation
                </>
              )}
            </button>

          </div>
        </section>

        {/* =====================================================
            ERROR
        ====================================================== */}

        {error && (
          <div
            style={{
              padding: '1rem',
              marginBottom: '1.5rem',
              borderRadius: '12px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b'
            }}
          >
            {error}
          </div>
        )}

        {/* =====================================================
            QUESTION SUMMARY
        ====================================================== */}

        {questions.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}
          >

            <SummaryCard
              icon={<Code2 size={21} />}
              title="Technical"
              count={technicalCount}
              background="#eff6ff"
              color="#2563eb"
            />

            <SummaryCard
              icon={<Briefcase size={21} />}
              title="Project"
              count={projectCount}
              background="#f5f3ff"
              color="#7c3aed"
            />

            <SummaryCard
              icon={<UserRound size={21} />}
              title="HR"
              count={hrCount}
              background="#ecfdf5"
              color="#059669"
            />

            <SummaryCard
              icon={<Trophy size={21} />}
              title="Total Questions"
              count={questions.length}
              background="#fff7ed"
              color="#ea580c"
            />

          </div>
        )}

        {/* =====================================================
            QUESTIONS
        ====================================================== */}

        {questions.length > 0 && (
          <div>

            {['Technical', 'Project', 'HR'].map(
              (category) => {

                const categoryQuestions =
                  questions.filter(
                    (q) => q.category === category
                  );

                if (categoryQuestions.length === 0) {
                  return null;
                }

                const categoryStyle =
                  getCategoryColor(category);

                return (
                  <section
                    key={category}
                    style={{
                      marginBottom: '2rem'
                    }}
                  >

                    {/* Category Header */}

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.7rem',
                        marginBottom: '1rem'
                      }}
                    >

                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background:
                            categoryStyle.background,
                          color:
                            categoryStyle.color,
                          border:
                            `1px solid ${categoryStyle.border}`
                        }}
                      >
                        {getCategoryIcon(category)}
                      </div>

                      <div>
                        <h2
                          style={{
                            margin: 0,
                            fontSize: '1.25rem'
                          }}
                        >
                          {category} Questions
                        </h2>

                        <span
                          style={{
                            color: '#64748b',
                            fontSize: '0.78rem'
                          }}
                        >
                          {categoryQuestions.length}{' '}
                          questions to practice
                        </span>
                      </div>

                    </div>

                    {categoryQuestions.map(
                      (q, index) => {

                        const actualIndex =
                          questions.indexOf(q);

                        const isOpen =
                          visibleAnswers[
                            actualIndex
                          ];

                        return (
                          <div
                            key={actualIndex}
                            style={{
                              background: '#fff',
                              borderRadius: '17px',
                              padding: '1.25rem',
                              marginBottom: '1rem',
                              border:
                                '1px solid #e2e8f0',
                              boxShadow:
                                '0 7px 22px rgba(15,23,42,0.05)'
                            }}
                          >

                            {/* Question */}

                            <div
                              style={{
                                display: 'flex',
                                gap: '0.85rem',
                                alignItems:
                                  'flex-start'
                              }}
                            >

                              <div
                                style={{
                                  minWidth: '36px',
                                  height: '36px',
                                  borderRadius: '10px',
                                  display: 'flex',
                                  alignItems:
                                    'center',
                                  justifyContent:
                                    'center',
                                  background:
                                    categoryStyle.background,
                                  color:
                                    categoryStyle.color,
                                  fontWeight: '800',
                                  fontSize: '0.85rem'
                                }}
                              >
                                {actualIndex + 1}
                              </div>

                              <div
                                style={{
                                  flex: 1
                                }}
                              >

                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent:
                                      'space-between',
                                    gap: '0.5rem',
                                    flexWrap: 'wrap',
                                    marginBottom:
                                      '0.6rem'
                                  }}
                                >

                                  <span
                                    style={{
                                      fontSize:
                                        '0.72rem',
                                      fontWeight:
                                        '800',
                                      color:
                                        categoryStyle.color,
                                      textTransform:
                                        'uppercase'
                                    }}
                                  >
                                    {category}
                                  </span>

                                  {q.difficulty && (
                                    <span
                                      style={{
                                        ...getDifficultyStyle(
                                          q.difficulty
                                        ),
                                        padding:
                                          '4px 9px',
                                        borderRadius:
                                          '999px',
                                        fontSize:
                                          '0.68rem',
                                        fontWeight:
                                          '800'
                                      }}
                                    >
                                      {q.difficulty}
                                    </span>
                                  )}

                                </div>

                                <h3
                                  style={{
                                    margin: 0,
                                    fontSize:
                                      '1rem',
                                    lineHeight: 1.6,
                                    color:
                                      '#0f172a'
                                  }}
                                >
                                  {q.question}
                                </h3>

                              </div>
                            </div>

                            {/* Tip */}

                            {q.tip && (
                              <div
                                style={{
                                  display: 'flex',
                                  gap: '0.65rem',
                                  marginTop: '1rem',
                                  padding:
                                    '0.9rem',
                                  borderRadius:
                                    '11px',
                                  background:
                                    '#fffbeb',
                                  border:
                                    '1px solid #fde68a'
                                }}
                              >

                                <Lightbulb
                                  size={18}
                                  color="#d97706"
                                  style={{
                                    flexShrink: 0
                                  }}
                                />

                                <div>
                                  <strong
                                    style={{
                                      color:
                                        '#92400e',
                                      fontSize:
                                        '0.8rem'
                                    }}
                                  >
                                    Preparation Tip
                                  </strong>

                                  <p
                                    style={{
                                      margin:
                                        '0.25rem 0 0',
                                      color:
                                        '#78350f',
                                      fontSize:
                                        '0.78rem',
                                      lineHeight:
                                        1.5
                                    }}
                                  >
                                    {q.tip}
                                  </p>
                                </div>

                              </div>
                            )}

                            {/* Answer button */}

                            <button
                              onClick={() =>
                                toggleAnswer(
                                  actualIndex
                                )
                              }
                              style={{
                                display: 'flex',
                                alignItems:
                                  'center',
                                justifyContent:
                                  'center',
                                gap: '0.45rem',
                                marginTop: '1rem',
                                padding:
                                  '9px 14px',
                                borderRadius:
                                  '9px',
                                border:
                                  '1px solid #cbd5e1',
                                background:
                                  isOpen
                                    ? '#eef2ff'
                                    : '#fff',
                                color:
                                  isOpen
                                    ? '#4338ca'
                                    : '#475569',
                                fontWeight: '700',
                                fontSize:
                                  '0.78rem',
                                cursor: 'pointer'
                              }}
                            >
                              {isOpen ? (
                                <>
                                  Hide Expected Answer
                                  <ChevronUp size={16} />
                                </>
                              ) : (
                                <>
                                  Show Expected Answer
                                  <ChevronDown size={16} />
                                </>
                              )}
                            </button>

                            {/* Answer */}

                            {isOpen && (
                              <div
                                style={{
                                  marginTop: '1rem',
                                  padding: '1rem',
                                  borderRadius:
                                    '12px',
                                  background:
                                    'linear-gradient(135deg, #eef2ff, #f5f3ff)',
                                  border:
                                    '1px solid #ddd6fe'
                                }}
                              >

                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems:
                                      'center',
                                    gap: '0.5rem',
                                    marginBottom:
                                      '0.5rem',
                                    color:
                                      '#4338ca',
                                    fontWeight:
                                      '800',
                                    fontSize:
                                      '0.8rem'
                                  }}
                                >
                                  <Sparkles
                                    size={17}
                                  />
                                  Expected Answer
                                </div>

                                <p
                                  style={{
                                    margin: 0,
                                    color:
                                      '#334155',
                                    fontSize:
                                      '0.85rem',
                                    lineHeight: 1.7
                                  }}
                                >
                                  {q.expectedAnswer ||
                                    'Prepare a clear answer based on your own experience and understanding.'}
                                </p>

                              </div>
                            )}

                          </div>
                        );
                      }
                    )}

                  </section>
                );
              }
            )}

          </div>
        )}

        {/* =====================================================
            EMPTY STATE
        ====================================================== */}

        {questions.length === 0 &&
          !loading && (
            <section
              style={{
                textAlign: 'center',
                padding: '3rem 1.5rem',
                background: '#fff',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                boxShadow:
                  '0 10px 30px rgba(15,23,42,0.05)'
              }}
            >

              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '20px',
                  margin: '0 auto 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background:
                    'linear-gradient(135deg, #ede9fe, #e0e7ff)',
                  color: '#6366f1'
                }}
              >
                <Brain size={34} />
              </div>

              <h2
                style={{
                  marginBottom: '0.5rem'
                }}
              >
                Ready to start?
              </h2>

              <p
                style={{
                  maxWidth: '520px',
                  margin: '0 auto',
                  color: '#64748b',
                  fontSize: '0.9rem',
                  lineHeight: 1.6
                }}
              >
                Select your target role above and click
                <strong> Start Preparation </strong>
                to receive interview questions.
              </p>

            </section>
          )}

      </div>

      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          button:hover {
            transform: translateY(-1px);
          }

          a.card:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(15,23,42,0.10);
          }
        `}
      </style>
    </div>
  );
};

const SummaryCard = ({
  icon,
  title,
  count,
  background,
  color
}) => {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '1rem',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
        boxShadow:
          '0 5px 18px rgba(15,23,42,0.04)'
      }}
    >
      <div
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '11px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background,
          color
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontSize: '1.35rem',
            fontWeight: '800',
            color: '#0f172a'
          }}
        >
          {count}
        </div>

        <div
          style={{
            fontSize: '0.72rem',
            color: '#64748b'
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export default InterviewPreparation;