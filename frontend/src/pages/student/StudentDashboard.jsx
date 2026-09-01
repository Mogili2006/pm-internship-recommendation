import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import ScoreBadge from '../../components/ScoreBadge';

import {
  Sparkles,
  Bookmark,
  FileText,
  User,
  ArrowRight,
  Briefcase,
  MapPin,
  IndianRupee,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Search,
  RefreshCw,
  MessageSquareText
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [savedCount, setSavedCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [recommendationsLoading, setRecommendationsLoading] =
    useState(true);
  const [profileError, setProfileError] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setRecommendationsLoading(true);

    // =========================================================
    // 1. FETCH PROFILE
    // =========================================================
    try {
      const profileResponse = await api.get('/students/me');

      console.log(
        'PROFILE FROM BACKEND:',
        profileResponse.data
      );

      setProfile(profileResponse.data);
      setProfileError(false);
    } catch (error) {
      console.error('Student profile failed:', error);

      setProfile(null);
      setProfileError(true);
    }

    // =========================================================
    // 2. FETCH RECOMMENDATIONS
    // =========================================================
    try {
      const recommendationResponse =
        await api.get('/recommendations');

      console.log(
        'RECOMMENDATIONS FROM BACKEND:',
        recommendationResponse.data
      );

      const recommendationData = Array.isArray(
        recommendationResponse.data
      )
        ? recommendationResponse.data
        : [];

      const sortedRecommendations = [
        ...recommendationData
      ].sort(
        (a, b) =>
          Number(b?.overallScore || 0) -
          Number(a?.overallScore || 0)
      );

      setRecommendations(
        sortedRecommendations.slice(0, 3)
      );
    } catch (error) {
      console.error('Recommendations failed:', error);
      setRecommendations([]);
    } finally {
      setRecommendationsLoading(false);
    }

    // =========================================================
    // 3. FETCH SAVED INTERNSHIPS
    // =========================================================
    try {
      const savedResponse = await api.get('/saved');

      const savedData = Array.isArray(savedResponse.data)
        ? savedResponse.data
        : [];

      setSavedCount(savedData.length);
    } catch (error) {
      console.error(
        'Saved internships failed:',
        error
      );

      setSavedCount(0);
    }

    // =========================================================
    // 4. FETCH APPLICATIONS
    // =========================================================
    try {
      const applicationResponse =
        await api.get('/applications');

      const applicationData = Array.isArray(
        applicationResponse.data
      )
        ? applicationResponse.data
        : [];

      setApplicationsCount(applicationData.length);
    } catch (error) {
      console.error(
        'Applications failed:',
        error
      );

      setApplicationsCount(0);
    }

    setLoading(false);
  };

  // =========================================================
  // PROFILE COMPLETION
  // =========================================================

  const completion = Math.max(
    0,
    Math.min(
      100,
      Number(profile?.completionPercentage ?? 0)
    )
  );

  const profileIncomplete = completion < 100;

  const getCompletionMessage = () => {
    if (completion === 0) {
      return {
        title: 'Start building your profile',
        text:
          'Your recommendations are still available, but adding profile information will make your matching scores more meaningful.'
      };
    }

    if (completion < 50) {
      return {
        title: 'Your profile needs more information',
        text:
          'Your profile is less than 50% complete. Add your education, skills, interests and preferences to improve your internship matches.'
      };
    }

    if (completion < 80) {
      return {
        title: 'Good progress — keep going!',
        text:
          'Your profile is more than halfway complete. Add the remaining information to improve recommendation accuracy.'
      };
    }

    if (completion < 100) {
      return {
        title: 'Almost there!',
        text:
          'Your profile is nearly complete. Add the remaining information to get the most accurate internship matching.'
      };
    }

    return {
      title: 'Your profile is complete!',
      text:
        'Your recommendations can now use your complete profile information.'
    };
  };

  const completionMessage = getCompletionMessage();

  // =========================================================
  // MATCHING SCORE HELPERS
  // =========================================================

  const getScore = (recommendation) => {
    const score = Number(
      recommendation?.overallScore ??
        recommendation?.matchingScore ??
        recommendation?.score ??
        0
    );

    return Math.max(
      0,
      Math.min(100, Math.round(score))
    );
  };

  const getScoreLabel = (score) => {
    if (score >= 85) return 'Excellent Match';
    if (score >= 70) return 'Strong Match';
    if (score >= 50) return 'Good Match';
    if (score >= 30) return 'Partial Match';

    return 'Low Match';
  };

  const getScoreDescription = (score) => {
    if (score >= 85) {
      return 'This internship strongly matches your profile.';
    }

    if (score >= 70) {
      return 'Your profile matches many requirements for this internship.';
    }

    if (score >= 50) {
      return 'You have several relevant profile attributes for this internship.';
    }

    return 'Complete more of your profile to improve this match.';
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            textAlign: 'center',
            color: 'var(--text-muted)'
          }}
        >
          <RefreshCw
            size={32}
            style={{
              animation:
                'spin 1s linear infinite',
              marginBottom: '0.75rem'
            }}
          />

          <h3 style={{ marginBottom: '0.35rem' }}>
            Loading your dashboard...
          </h3>

          <p style={{ fontSize: '0.9rem' }}>
            Finding internships that match your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 1rem 2rem'
      }}
    >
      {/* =====================================================
          WELCOME HEADER
      ====================================================== */}

      <section
        style={{
          background:
            'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)',
          borderRadius: '22px',
          padding: '2rem',
          color: '#fff',
          marginBottom: '1.5rem',
          boxShadow:
            '0 18px 45px rgba(30, 64, 175, 0.18)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative circles */}

        <div
          style={{
            position: 'absolute',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background:
              'rgba(255,255,255,0.06)',
            right: '-80px',
            top: '-90px'
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background:
              'rgba(96,165,250,0.12)',
            right: '160px',
            bottom: '-80px'
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '850px'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background:
                'rgba(255,255,255,0.12)',
              border:
                '1px solid rgba(255,255,255,0.15)',
              padding:
                '0.4rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: '700',
              marginBottom: '0.9rem'
            }}
          >
            <Sparkles size={14} />

            PM Internship Recommendation Portal
          </div>

          <h1
            style={{
              color: '#fff',
              fontSize:
                'clamp(1.7rem, 4vw, 2.4rem)',
              marginBottom: '0.55rem',
              lineHeight: 1.2
            }}
          >
            Welcome back,{' '}
            {user?.name || 'Student'} 👋
          </h1>

          <p
            style={{
              color: '#dbeafe',
              fontSize: '0.98rem',
              lineHeight: 1.6,
              marginBottom: '1.25rem'
            }}
          >
            Discover internship opportunities
            matched to your skills, education and
            career preferences.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap'
            }}
          >
            <Link
              to="/student/recommendations"
              className="btn"
              style={{
                background: '#fff',
                color: '#1d4ed8',
                fontWeight: '700',
                border: 'none'
              }}
            >
              <Sparkles size={17} />

              View Recommendations
            </Link>

            {profileIncomplete && (
              <Link
                to="/student/profile"
                className="btn"
                style={{
                  background:
                    'rgba(255,255,255,0.12)',
                  color: '#fff',
                  border:
                    '1px solid rgba(255,255,255,0.3)'
                }}
              >
                <User size={17} />

                Complete Profile
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROFILE COMPLETION
      ====================================================== */}

      {(() => {
        const isLowCompletion =
          completion < 50;

        const completionTheme =
          isLowCompletion
            ? {
                border: '#fecaca',
                background:
                  'linear-gradient(135deg, #fef2f2, #ffffff)',
                iconBackground: '#fee2e2',
                color: '#dc2626',
                darkColor: '#991b1b',
                progressColor: '#dc2626'
              }
            : {
                border: '#bbf7d0',
                background:
                  'linear-gradient(135deg, #f0fdf4, #ffffff)',
                iconBackground: '#dcfce7',
                color: '#16a34a',
                darkColor: '#166534',
                progressColor: '#16a34a'
              };

        return (
          <section
            className="card"
            style={{
              marginBottom: '1.5rem',
              border:
                `1px solid ${completionTheme.border}`,
              background:
                completionTheme.background,
              padding: '1.4rem',
              borderRadius: '18px'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
                flexWrap: 'wrap'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '0.85rem',
                  flex: 1,
                  minWidth: '260px'
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background:
                      completionTheme.iconBackground,
                    color:
                      completionTheme.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {isLowCompletion ? (
                    <AlertCircle size={23} />
                  ) : (
                    <CheckCircle2 size={23} />
                  )}
                </div>

                <div>
                  <h3
                    style={{
                      marginBottom: '0.25rem',
                      color:
                        completionTheme.darkColor
                    }}
                  >
                    {completionMessage.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      lineHeight: 1.55,
                      color:
                        completionTheme.darkColor
                    }}
                  >
                    {completionMessage.text}
                  </p>
                </div>
              </div>

              <div
                style={{
                  minWidth: '110px',
                  textAlign: 'right'
                }}
              >
                <div
                  style={{
                    fontSize: '1.9rem',
                    fontWeight: '800',
                    color:
                      completionTheme.color,
                    lineHeight: 1
                  }}
                >
                  {completion}%
                </div>

                <span
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem'
                  }}
                >
                  Profile complete
                </span>
              </div>
            </div>

            {/* Progress */}

            <div
              style={{
                marginTop: '1rem'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent:
                    'space-between',
                  marginBottom: '0.35rem',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)'
                }}
              >
                <span>
                  Profile progress
                </span>

                <span>
                  {100 - completion}% remaining
                </span>
              </div>

              <div
                style={{
                  height: '10px',
                  background: '#e5e7eb',
                  borderRadius: '999px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: `${completion}%`,
                    height: '100%',
                    borderRadius: '999px',
                    background:
                      completionTheme.progressColor,
                    transition:
                      'width 0.4s ease'
                  }}
                />
              </div>
            </div>

            {profileIncomplete && (
              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  justifyContent:
                    'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}
              >
                <span
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  💡 Recommendations are
                  available now. Completing your
                  profile improves their accuracy.
                </span>

                <Link
                  to="/student/profile"
                  className="btn btn-primary btn-sm"
                >
                  Update Profile

                  <ArrowRight size={15} />
                </Link>
              </div>
            )}
          </section>
        );
      })()}

      {/* =====================================================
          PROFILE ERROR
      ====================================================== */}

      {profileError && (
        <div
          className="card"
          style={{
            marginBottom: '1.5rem',
            border: '1px solid #fecaca',
            background: '#fef2f2',
            borderRadius: '16px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}
          >
            <AlertCircle
              size={22}
              color="#dc2626"
            />

            <div>
              <h4
                style={{
                  color: '#991b1b',
                  marginBottom: '0.25rem'
                }}
              >
                We couldn't load your profile
              </h4>

              <p
                style={{
                  color: '#991b1b',
                  fontSize: '0.85rem'
                }}
              >
                Your dashboard is still available,
                but your profile information could
                not be retrieved. Please refresh the
                page or log in again if the problem
                continues.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        {/* Recommendations */}

        <Link
          to="/student/recommendations"
          className="dashboard-stat-card"
          style={{
            '--card-accent': '#f59e0b',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent:
                'space-between',
              alignItems: 'flex-start'
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background:
                  'linear-gradient(135deg, #fef3c7, #fde68a)',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Sparkles size={22} />
            </div>

            <TrendingUp
              size={18}
              color="#16a34a"
            />
          </div>

          <div className="stat-number">
            {recommendations.length}
          </div>

          <div className="stat-label">
            Top Recommendations
          </div>
        </Link>

        {/* Saved */}

        <Link
          to="/student/internships"
          className="dashboard-stat-card"
          style={{
            '--card-accent': '#0284c7',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background:
                'linear-gradient(135deg, #e0f2fe, #bae6fd)',
              color: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Bookmark size={22} />
          </div>

          <div className="stat-number">
            {savedCount}
          </div>

          <div className="stat-label">
            Saved Internships
          </div>
        </Link>

        {/* Applications */}

        <Link
          to="/student/applications"
          className="dashboard-stat-card"
          style={{
            '--card-accent': '#16a34a',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background:
                'linear-gradient(135deg, #dcfce7, #bbf7d0)',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FileText size={22} />
          </div>

          <div className="stat-number">
            {applicationsCount}
          </div>

          <div className="stat-label">
            Applications Sent
          </div>
        </Link>

        {/* Profile */}

        <Link
          to="/student/profile"
          className="dashboard-stat-card"
          style={{
            '--card-accent': '#9333ea',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background:
                'linear-gradient(135deg, #f3e8ff, #e9d5ff)',
              color: '#9333ea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <User size={22} />
          </div>

          <div className="stat-number">
            {completion}%
          </div>

          <div className="stat-label">
            Profile Completion
          </div>
        </Link>
      </div>

      {/* =====================================================
          RECOMMENDATIONS
      ====================================================== */}

      <section style={{ marginBottom: '2rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent:
              'space-between',
            alignItems: 'flex-end',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '1rem'
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.25rem'
              }}
            >
              <Sparkles
                size={22}
                color="#f59e0b"
              />

              <h2 style={{ margin: 0 }}>
                Recommended for You
              </h2>
            </div>

            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.88rem'
              }}
            >
              Based on the information currently
              available in your profile.
            </p>
          </div>

          <Link
            to="/student/recommendations"
            className="btn btn-secondary btn-sm"
          >
            View All

            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Loading */}

        {recommendationsLoading ? (
          <div
            className="card"
            style={{
              textAlign: 'center',
              padding: '3rem',
              borderRadius: '18px'
            }}
          >
            <RefreshCw
              size={30}
              style={{
                marginBottom: '0.75rem',
                animation:
                  'spin 1s linear infinite'
              }}
            />

            <h3>
              Finding your best matches...
            </h3>

            <p
              style={{
                color: 'var(--text-muted)',
                marginTop: '0.4rem'
              }}
            >
              We're comparing your profile with
              available internships.
            </p>
          </div>
        ) : recommendations.length === 0 ? (
          <div
            className="card"
            style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              background:
                'linear-gradient(135deg, #ffffff, #f8fafc)',
              borderRadius: '18px'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '18px',
                background:
                  'linear-gradient(135deg, #fef3c7, #fde68a)',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}
            >
              <Search size={30} />
            </div>

            <h3>
              No recommendations available yet
            </h3>

            <p
              style={{
                color: 'var(--text-muted)',
                maxWidth: '520px',
                margin:
                  '0.5rem auto 1rem',
                lineHeight: 1.6
              }}
            >
              We couldn't find matching
              internships right now. Try adding
              more skills, education details,
              interests or preferences to your
              profile.
            </p>

            <Link
              to="/student/profile"
              className="btn btn-primary"
            >
              Improve My Profile

              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem'
            }}
          >
            {recommendations.map(
              (rec, index) => {
                const score = getScore(rec);

                const scoreColor =
                  score >= 85
                    ? '#16a34a'
                    : score >= 70
                    ? '#2563eb'
                    : score >= 50
                    ? '#f59e0b'
                    : '#94a3b8';

                return (
                  <div
                    className="card recommendation-card"
                    key={
                      rec.internshipId ||
                      rec.id ||
                      index
                    }
                    style={{
                      display: 'flex',
                      flexDirection:
                        'column',
                      padding: '1.25rem',
                      position:
                        'relative',
                      overflow:
                        'hidden',
                      borderRadius:
                        '18px'
                    }}
                  >
                    {/* Match indicator */}

                    <div
                      style={{
                        position:
                          'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background:
                          scoreColor
                      }}
                    />

                    {/* Ranking */}

                    <div
                      style={{
                        display: 'flex',
                        justifyContent:
                          'space-between',
                        alignItems:
                          'flex-start',
                        gap: '0.75rem',
                        marginBottom:
                          '0.85rem'
                      }}
                    >
                      <span
                        style={{
                          fontSize:
                            '0.72rem',
                          fontWeight:
                            '800',
                          color:
                            'var(--text-muted)',
                          background:
                            '#f1f5f9',
                          padding:
                            '0.3rem 0.55rem',
                          borderRadius:
                            '999px'
                        }}
                      >
                        #{index + 1}{' '}
                        MATCH
                      </span>

                      <ScoreBadge
                        score={score}
                      />
                    </div>

                    {/* Title */}

                    <h3
                      style={{
                        fontSize:
                          '1.1rem',
                        lineHeight:
                          1.35,
                        marginBottom:
                          '0.3rem'
                      }}
                    >
                      {rec
                        .internship
                        ?.title ||
                        rec.title ||
                        'Internship'}
                    </h3>

                    {/* Company */}

                    <p
                      style={{
                        color:
                          'var(--primary)',
                        fontWeight:
                          '700',
                        fontSize:
                          '0.9rem',
                        marginBottom:
                          '0.85rem'
                      }}
                    >
                      {rec
                        .internship
                        ?.company ||
                        rec.company ||
                        'Company'}
                    </p>

                    {/* Score */}

                    <div
                      style={{
                        background:
                          '#f8fafc',
                        borderRadius:
                          '10px',
                        padding:
                          '0.75rem',
                        marginBottom:
                          '0.9rem'
                      }}
                    >
                      <div
                        style={{
                          display:
                            'flex',
                          justifyContent:
                            'space-between',
                          alignItems:
                            'center',
                          marginBottom:
                            '0.4rem'
                        }}
                      >
                        <span
                          style={{
                            fontSize:
                              '0.78rem',
                            fontWeight:
                              '700'
                          }}
                        >
                          {getScoreLabel(
                            score
                          )}
                        </span>

                        <span
                          style={{
                            fontSize:
                              '0.78rem',
                            fontWeight:
                              '800'
                          }}
                        >
                          {score}%
                        </span>
                      </div>

                      <div
                        style={{
                          height:
                            '7px',
                          background:
                            '#e2e8f0',
                          borderRadius:
                            '999px',
                          overflow:
                            'hidden'
                        }}
                      >
                        <div
                          style={{
                            width: `${score}%`,
                            height:
                              '100%',
                            background:
                              scoreColor,
                            borderRadius:
                              '999px'
                          }}
                        />
                      </div>

                      <p
                        style={{
                          fontSize:
                            '0.74rem',
                          color:
                            'var(--text-muted)',
                          marginTop:
                            '0.45rem',
                          lineHeight:
                            1.4
                        }}
                      >
                        {getScoreDescription(
                          score
                        )}
                      </p>
                    </div>

                    {/* Internship Information */}

                    <div
                      style={{
                        display:
                          'grid',
                        gap:
                          '0.5rem',
                        marginBottom:
                          '0.9rem'
                      }}
                    >
                      <div
                        style={{
                          display:
                            'flex',
                          alignItems:
                            'center',
                          gap:
                            '0.45rem',
                          color:
                            'var(--text-muted)',
                          fontSize:
                            '0.8rem'
                        }}
                      >
                        <MapPin
                          size={15}
                        />

                        <span>
                          {rec
                            .internship
                            ?.location ||
                            rec.location ||
                            'Remote'}
                        </span>
                      </div>

                      <div
                        style={{
                          display:
                            'flex',
                          alignItems:
                            'center',
                          gap:
                            '0.45rem',
                          color:
                            'var(--text-muted)',
                          fontSize:
                            '0.8rem'
                        }}
                      >
                        <Briefcase
                          size={15}
                        />

                        <span>
                          {rec
                            .internship
                            ?.workMode ||
                            rec.workMode ||
                            'Not specified'}
                        </span>
                      </div>

                      <div
                        style={{
                          display:
                            'flex',
                          alignItems:
                            'center',
                          gap:
                            '0.45rem',
                          color:
                            'var(--text-muted)',
                          fontSize:
                            '0.8rem'
                        }}
                      >
                        <IndianRupee
                          size={15}
                        />

                        <span>
                          {rec
                            .internship
                            ?.stipend
                            ? `₹${Number(
                                rec
                                  .internship
                                  .stipend
                              ).toLocaleString(
                                'en-IN'
                              )}/month`
                            : 'Stipend not specified'}
                        </span>
                      </div>
                    </div>

                    {/* Matching Skills */}

                    {Array.isArray(
                      rec.matchingSkills
                    ) &&
                    rec.matchingSkills
                      .length > 0 ? (
                      <div
                        style={{
                          marginBottom:
                            '0.9rem'
                        }}
                      >
                        <div
                          style={{
                            display:
                              'flex',
                            alignItems:
                              'center',
                            gap:
                              '0.35rem',
                            fontSize:
                              '0.78rem',
                            fontWeight:
                              '700',
                            marginBottom:
                              '0.45rem'
                          }}
                        >
                          <CheckCircle2
                            size={15}
                            color="#16a34a"
                          />

                          Matching Skills
                        </div>

                        <div
                          style={{
                            display:
                              'flex',
                            flexWrap:
                              'wrap',
                            gap:
                              '0.35rem'
                          }}
                        >
                          {rec.matchingSkills
                            .slice(
                              0,
                              4
                            )
                            .map(
                              (
                                skill,
                                skillIndex
                              ) => (
                                <span
                                  key={
                                    skillIndex
                                  }
                                  style={{
                                    background:
                                      '#dcfce7',
                                    color:
                                      '#166534',
                                    padding:
                                      '0.28rem 0.5rem',
                                    borderRadius:
                                      '999px',
                                    fontSize:
                                      '0.72rem',
                                    fontWeight:
                                      '600'
                                  }}
                                >
                                  ✓ {skill}
                                </span>
                              )
                            )}
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          background:
                            '#fffbeb',
                          color:
                            '#92400e',
                          border:
                            '1px solid #fde68a',
                          padding:
                            '0.6rem',
                          borderRadius:
                            '9px',
                          fontSize:
                            '0.75rem',
                          marginBottom:
                            '0.9rem'
                        }}
                      >
                        Add more skills to
                        improve this match.
                      </div>
                    )}

                    {/* Missing Skills */}

                    {Array.isArray(
                      rec.missingSkills
                    ) &&
                      rec.missingSkills
                        .length > 0 && (
                        <div
                          style={{
                            background:
                              '#f8fafc',
                            padding:
                              '0.6rem',
                            borderRadius:
                              '9px',
                            marginBottom:
                              '0.9rem',
                            fontSize:
                              '0.74rem',
                            color:
                              'var(--text-muted)'
                          }}
                        >
                          <strong>
                            Skills you
                            could improve:
                          </strong>{' '}
                          {rec.missingSkills
                            .slice(
                              0,
                              3
                            )
                            .join(
                              ', '
                            )}
                        </div>
                      )}

                    {/* Action */}

                    <div
                      style={{
                        marginTop:
                          'auto'
                      }}
                    >
                      <Link
                        to={`/student/recommendations/${
                          rec.internshipId ||
                          rec.id
                        }`}
                        className="btn btn-primary btn-sm"
                        style={{
                          width:
                            '100%',
                          justifyContent:
                            'center'
                        }}
                      >
                        View Match & Apply

                        <ArrowRight
                          size={15}
                        />
                      </Link>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </section>

      {/* =====================================================
          PROFILE IMPROVEMENT BANNER
      ====================================================== */}

      {profileIncomplete &&
        recommendations.length > 0 && (
          <section
            className="card"
            style={{
              marginBottom: '2rem',
              background:
                'linear-gradient(135deg, #eff6ff, #ffffff)',
              border:
                '1px solid #bfdbfe',
              padding: '1.5rem',
              borderRadius: '18px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems:
                  'center',
                justifyContent:
                  'space-between',
                gap: '1.5rem',
                flexWrap: 'wrap'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems:
                    'flex-start',
                  gap: '0.9rem',
                  flex: 1
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius:
                      '12px',
                    background:
                      '#dbeafe',
                    color:
                      '#2563eb',
                    display:
                      'flex',
                    alignItems:
                      'center',
                    justifyContent:
                      'center',
                    flexShrink: 0
                  }}
                >
                  <TrendingUp
                    size={22}
                  />
                </div>

                <div>
                  <h3
                    style={{
                      marginBottom:
                        '0.3rem',
                      color:
                        '#1e3a8a'
                    }}
                  >
                    Improve your matching score
                  </h3>

                  <p
                    style={{
                      color:
                        '#475569',
                      fontSize:
                        '0.86rem',
                      lineHeight:
                        1.55
                    }}
                  >
                    Your current profile is{' '}
                    <strong>
                      {completion}%
                      complete
                    </strong>
                    . You already receive
                    recommendations, but adding
                    more information can help the
                    system identify better internship
                    matches.
                  </p>
                </div>
              </div>

              <Link
                to="/student/profile"
                className="btn btn-primary"
              >
                Complete Profile

                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        )}

      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}

      <section>
        <div
          style={{
            marginBottom: '1rem'
          }}
        >
          <h2
            style={{
              marginBottom: '0.25rem'
            }}
          >
            Quick Actions
          </h2>

          <p
            style={{
              color:
                'var(--text-muted)',
              fontSize:
                '0.88rem'
            }}
          >
            Manage your internship search,
            applications and interview preparation
            from one place.
          </p>
        </div>

        {/* =================================================
            QUICK ACTION CARDS
        ================================================= */}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem'
          }}
        >
          {/* =================================================
              PROFILE
          ================================================= */}

          <Link
            to="/student/profile"
            className="quick-action-card"
            style={{
              '--action-color': '#2563eb',
              '--action-light': '#dbeafe',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div className="quick-action-icon">
              <User size={25} />
            </div>

            <div className="quick-action-content">
              <h4>
                My Profile
              </h4>

              <span>
                Skills, education & preferences
              </span>
            </div>

            <div className="quick-action-arrow">
              <ArrowRight size={17} />
            </div>
          </Link>

          {/* =================================================
              AI MATCHES
          ================================================= */}

          <Link
            to="/student/recommendations"
            className="quick-action-card"
            style={{
              '--action-color': '#f59e0b',
              '--action-light': '#fef3c7',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div className="quick-action-icon">
              <Sparkles size={25} />
            </div>

            <div className="quick-action-content">
              <h4>
                AI Matches
              </h4>

              <span>
                Matching scores & recommendations
              </span>
            </div>

            <div className="quick-action-arrow">
              <ArrowRight size={17} />
            </div>
          </Link>

          {/* =================================================
              INTERNSHIPS
          ================================================= */}

          <Link
            to="/student/internships"
            className="quick-action-card"
            style={{
              '--action-color': '#0284c7',
              '--action-light': '#e0f2fe',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div className="quick-action-icon">
              <Briefcase size={25} />
            </div>

            <div className="quick-action-content">
              <h4>
                Browse Internships
              </h4>

              <span>
                Search all available opportunities
              </span>
            </div>

            <div className="quick-action-arrow">
              <ArrowRight size={17} />
            </div>
          </Link>

          {/* =================================================
              APPLICATIONS
          ================================================= */}

          <Link
            to="/student/applications"
            className="quick-action-card"
            style={{
              '--action-color': '#16a34a',
              '--action-light': '#dcfce7',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div className="quick-action-icon">
              <FileText size={25} />
            </div>

            <div className="quick-action-content">
              <h4>
                Applications
              </h4>

              <span>
                Track your application status
              </span>
            </div>

            <div className="quick-action-arrow">
              <ArrowRight size={17} />
            </div>
          </Link>

          {/* =================================================
              AI INTERVIEW PREPARATION
          ================================================= */}

          <Link
            to="/student/interview-preparation"
            className="quick-action-card interview-card"
            style={{
              '--action-color': '#7c3aed',
              '--action-light': '#ede9fe',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            {/* AI badge */}

            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background:
                  'linear-gradient(135deg, #7c3aed, #a855f7)',
                color: '#fff',
                padding:
                  '0.25rem 0.55rem',
                borderRadius:
                  '999px',
                fontSize:
                  '0.65rem',
                fontWeight: '800',
                letterSpacing:
                  '0.03em'
              }}
            >
              AI POWERED
            </div>

            <div
              className="quick-action-icon"
              style={{
                background:
                  'linear-gradient(135deg, #ede9fe, #ddd6fe)',
                color: '#7c3aed'
              }}
            >
              <MessageSquareText
                size={25}
              />
            </div>

            <div className="quick-action-content">
              <h4
                style={{
                  color: '#5b21b6'
                }}
              >
                AI Interview Preparation
              </h4>

              <span>
                Practice technical, project & HR
                questions
              </span>
            </div>

            <div
              className="quick-action-arrow"
              style={{
                color: '#7c3aed'
              }}
            >
              <ArrowRight size={17} />
            </div>
          </Link>
        </div>
      </section>

      {/* =====================================================
          STYLES
      ====================================================== */}

      <style>
        {`

          /* ================================
             DASHBOARD STAT CARDS
          ================================= */

          .dashboard-stat-card {
            position: relative;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 18px;
            padding: 1.25rem;
            overflow: hidden;
            box-shadow:
              0 5px 18px rgba(15, 23, 42, 0.05);
            transition:
              transform 0.25s ease,
              box-shadow 0.25s ease,
              border-color 0.25s ease;
          }

          .dashboard-stat-card::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: var(--card-accent);
          }

          .dashboard-stat-card:hover {
            transform: translateY(-5px);
            border-color: var(--card-accent);
            box-shadow:
              0 14px 30px rgba(15, 23, 42, 0.10);
          }

          .stat-number {
            font-size: 1.8rem;
            font-weight: 800;
            margin-top: 1rem;
            line-height: 1;
          }

          .stat-label {
            color: var(--text-muted);
            font-size: 0.82rem;
            margin-top: 0.4rem;
          }


          /* ================================
             RECOMMENDATION CARDS
          ================================= */

          .recommendation-card {
            transition:
              transform 0.25s ease,
              box-shadow 0.25s ease;
          }

          .recommendation-card:hover {
            transform: translateY(-4px);
            box-shadow:
              0 15px 32px rgba(15, 23, 42, 0.10);
          }


          /* ================================
             QUICK ACTION CARDS
          ================================= */

          .quick-action-card {
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.85rem;
            min-height: 105px;
            padding: 1.1rem;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 18px;
            overflow: hidden;

            box-shadow:
              0 5px 18px rgba(15, 23, 42, 0.05);

            transition:
              transform 0.25s ease,
              box-shadow 0.25s ease,
              border-color 0.25s ease;
          }

          .quick-action-card::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: var(--action-color);
          }

          .quick-action-card:hover {
            transform: translateY(-5px);
            border-color: var(--action-color);

            box-shadow:
              0 15px 30px rgba(15, 23, 42, 0.11);
          }

          .quick-action-icon {
            width: 48px;
            height: 48px;
            min-width: 48px;
            border-radius: 14px;

            display: flex;
            align-items: center;
            justify-content: center;

            background: var(--action-light);
            color: var(--action-color);

            transition:
              transform 0.25s ease;
          }

          .quick-action-card:hover
          .quick-action-icon {
            transform: scale(1.08) rotate(-3deg);
          }

          .quick-action-content {
            flex: 1;
            min-width: 0;
          }

          .quick-action-content h4 {
            margin: 0 0 0.3rem;
            font-size: 0.95rem;
            line-height: 1.3;
          }

          .quick-action-content span {
            display: block;
            color: var(--text-muted);
            font-size: 0.76rem;
            line-height: 1.45;
          }

          .quick-action-arrow {
            color: var(--action-color);
            opacity: 0.65;
            transition:
              transform 0.25s ease,
              opacity 0.25s ease;
          }

          .quick-action-card:hover
          .quick-action-arrow {
            transform: translateX(4px);
            opacity: 1;
          }


          /* ================================
             INTERVIEW CARD
          ================================= */

          .interview-card {
            background:
              linear-gradient(
                135deg,
                #ffffff 0%,
                #faf5ff 100%
              );
          }

          .interview-card:hover {
            background:
              linear-gradient(
                135deg,
                #ffffff 0%,
                #f5f3ff 100%
              );
          }


          /* ================================
             SPIN
          ================================= */

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }


          /* ================================
             MOBILE
          ================================= */

          @media (max-width: 640px) {

            .quick-action-card {
              min-height: 92px;
              padding: 0.95rem;
            }

            .quick-action-icon {
              width: 43px;
              height: 43px;
              min-width: 43px;
            }

            .quick-action-content h4 {
              font-size: 0.88rem;
            }

            .quick-action-content span {
              font-size: 0.72rem;
            }

            .dashboard-stat-card {
              padding: 1rem;
            }

          }

        `}
      </style>
    </div>
  );
};

export default StudentDashboard;