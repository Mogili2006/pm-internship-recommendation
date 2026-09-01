import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {
  Save,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  Code,
  Heart,
  Briefcase
} from 'lucide-react';

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    age: '',
    gender: '',

    educationLevel: '',
    degree: '',
    branch: '',
    institution: '',
    cgpa: '',
    graduationYear: '',

    careerGoal: '',

    preferredLocations: '',
    preferredWorkMode: '',
    preferredIndustries: '',
    preferredRoles: '',

    skills: [],
    interests: [],
    projects: [],

    certifications: [],
    languages: []
  });

  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'TECHNICAL',
    proficiency: 'INTERMEDIATE'
  });

  const [newInterest, setNewInterest] = useState('');

  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    technologies: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState({
    type: '',
    text: ''
  });

  // =========================================================
  // DROPDOWN OPTIONS
  // =========================================================

  const educationLevels = [
    'Undergraduate',
    'Postgraduate',
    'Diploma',
    'PhD',
    'Other'
  ];

  const degrees = [
    'B.Tech',
    'B.E',
    'B.Sc',
    'BCA',
    'B.Com',
    'BBA',
    'BA',
    'LLB',
    'MBBS',
    'M.Tech',
    'M.E',
    'M.Sc',
    'MCA',
    'MBA',
    'M.Com',
    'MA',
    'Other'
  ];

  const branches = [
    'Computer Science Engineering',
    'Information Technology',
    'Artificial Intelligence & Data Science',
    'Artificial Intelligence & Machine Learning',
    'Electronics & Communication',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Biotechnology',
    'Information Science',
    'Cyber Security',
    'Software Engineering',
    'Business Administration',
    'Commerce',
    'Economics',
    'Finance',
    'Marketing',
    'Human Resources',
    'Other'
  ];

  const skillOptions = [
    'Java',
    'Python',
    'JavaScript',
    'TypeScript',
    'C',
    'C++',
    'C#',
    'React',
    'Angular',
    'Vue.js',
    'Node.js',
    'Spring Boot',
    'HTML',
    'CSS',
    'SQL',
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'Git',
    'GitHub',
    'REST API',
    'Machine Learning',
    'Deep Learning',
    'Data Analysis',
    'Data Science',
    'Artificial Intelligence',
    'Cyber Security',
    'Cloud Computing',
    'AWS',
    'Azure',
    'Docker',
    'Kubernetes',
    'Communication',
    'Leadership',
    'Teamwork',
    'Problem Solving',
    'Time Management'
  ];

  const interestOptions = [
    'Software Development',
    'Web Development',
    'Mobile App Development',
    'Data Science',
    'Artificial Intelligence',
    'Machine Learning',
    'Cyber Security',
    'Cloud Computing',
    'DevOps',
    'UI/UX Design',
    'Blockchain',
    'Internet of Things',
    'Robotics',
    'Finance',
    'FinTech',
    'Marketing',
    'Business',
    'Human Resources',
    'Healthcare',
    'Research',
    'Education',
    'Government',
    'Entrepreneurship'
  ];

  const locationOptions = [
    'Remote',
    'Bengaluru',
    'Hyderabad',
    'Chennai',
    'Mumbai',
    'Delhi',
    'New Delhi',
    'Pune',
    'Kolkata',
    'Noida',
    'Gurugram',
    'Ahmedabad',
    'Jaipur',
    'Visakhapatnam',
    'Vijayawada',
    'Kochi',
    'Thiruvananthapuram',
    'Bhubaneswar',
    'Chandigarh',
    'Indore'
  ];

  const workModeOptions = [
    {
      value: 'REMOTE',
      label: 'Remote'
    },
    {
      value: 'HYBRID',
      label: 'Hybrid'
    },
    {
      value: 'ON_SITE',
      label: 'On-Site'
    }
  ];

  const roleOptions = [
    'Software Developer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Java Developer',
    'Python Developer',
    'React Developer',
    'Web Developer',
    'Mobile App Developer',
    'Data Analyst',
    'Data Scientist',
    'Machine Learning Engineer',
    'AI Engineer',
    'Cloud Engineer',
    'DevOps Engineer',
    'Cyber Security Analyst',
    'UI/UX Designer',
    'Business Analyst',
    'Product Manager',
    'Project Manager',
    'Marketing Intern',
    'Finance Intern',
    'HR Intern'
  ];

  const technologyOptions = [
    'Java',
    'Python',
    'JavaScript',
    'TypeScript',
    'C',
    'C++',
    'C#',
    'React',
    'Angular',
    'Vue.js',
    'Node.js',
    'Express.js',
    'Spring Boot',
    'HTML',
    'CSS',
    'Tailwind CSS',
    'Bootstrap',
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'Firebase',
    'AWS',
    'Azure',
    'Docker',
    'Kubernetes',
    'TensorFlow',
    'PyTorch',
    'Pandas',
    'NumPy',
    'Scikit-learn',
    'Git',
    'GitHub'
  ];

  // =========================================================
  // FETCH PROFILE
  // =========================================================

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await api.get('/students/me');

      if (res.data) {
        setProfile({
          ...res.data,

          age: res.data.age ?? '',
          gender: res.data.gender ?? '',

          educationLevel:
            res.data.educationLevel || '',

          degree:
            res.data.degree || '',

          branch:
            res.data.branch || '',

          institution:
            res.data.institution || '',

          cgpa:
            res.data.cgpa ?? '',

          graduationYear:
            res.data.graduationYear ?? '',

          careerGoal:
            res.data.careerGoal || '',

          preferredLocations:
            res.data.preferredLocations || '',

          preferredWorkMode:
            res.data.preferredWorkMode || '',

          preferredIndustries:
            res.data.preferredIndustries || '',

          preferredRoles:
            res.data.preferredRoles || '',

          skills:
            Array.isArray(res.data.skills)
              ? res.data.skills
              : [],

          interests:
            Array.isArray(res.data.interests)
              ? res.data.interests
              : [],

          projects:
            Array.isArray(res.data.projects)
              ? res.data.projects
              : [],

          certifications:
            res.data.certifications || [],

          languages:
            res.data.languages || []
        });
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);

      setMessage({
        type: 'danger',
        text: 'Failed to fetch profile.'
      });
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // =========================================================
  // SKILLS
  // =========================================================

  const handleAddSkill = () => {
    if (!newSkill.name) {
      setMessage({
        type: 'danger',
        text: 'Please select a skill.'
      });
      return;
    }

    const alreadyExists = profile.skills.some(
      skill =>
        skill.name?.toLowerCase() ===
        newSkill.name.toLowerCase()
    );

    if (alreadyExists) {
      setMessage({
        type: 'danger',
        text: 'This skill has already been added.'
      });
      return;
    }

    setProfile(prev => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          ...newSkill
        }
      ]
    }));

    setNewSkill({
      name: '',
      category: 'TECHNICAL',
      proficiency: 'INTERMEDIATE'
    });

    setMessage({
      type: '',
      text: ''
    });
  };

  const handleRemoveSkill = (index) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(
        (_, i) => i !== index
      )
    }));
  };

  // =========================================================
  // INTERESTS
  // =========================================================

  const handleAddInterest = () => {
    if (!newInterest) {
      setMessage({
        type: 'danger',
        text: 'Please select an interest.'
      });
      return;
    }

    if (
      profile.interests.some(
        interest =>
          interest.toLowerCase() ===
          newInterest.toLowerCase()
      )
    ) {
      setMessage({
        type: 'danger',
        text: 'This interest has already been added.'
      });
      return;
    }

    setProfile(prev => ({
      ...prev,
      interests: [
        ...prev.interests,
        newInterest
      ]
    }));

    setNewInterest('');

    setMessage({
      type: '',
      text: ''
    });
  };

  const handleRemoveInterest = (index) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(
        (_, i) => i !== index
      )
    }));
  };

  // =========================================================
  // PROJECTS
  // =========================================================

  const handleAddProject = () => {
    if (!newProject.name.trim()) {
      setMessage({
        type: 'danger',
        text: 'Project name is required.'
      });
      return;
    }

    if (!newProject.technologies.trim()) {
      setMessage({
        type: 'danger',
        text: 'Please select project technologies.'
      });
      return;
    }

    if (!newProject.description.trim()) {
      setMessage({
        type: 'danger',
        text: 'Please enter project description.'
      });
      return;
    }

    setProfile(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          ...newProject,
          name: newProject.name.trim(),
          technologies:
            newProject.technologies.trim(),
          description:
            newProject.description.trim()
        }
      ]
    }));

    setNewProject({
      name: '',
      description: '',
      technologies: ''
    });

    setMessage({
      type: '',
      text: ''
    });
  };

  const handleRemoveProject = (index) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.filter(
        (_, i) => i !== index
      )
    }));
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateProfile = () => {
    if (!profile.educationLevel?.trim()) {
      return 'Education Level is required.';
    }

    if (!profile.degree?.trim()) {
      return 'Degree is required.';
    }

    if (!profile.branch?.trim()) {
      return 'Branch / Field is required.';
    }

    if (!profile.institution?.trim()) {
      return 'Institution / College is required.';
    }

    if (
      profile.cgpa === '' ||
      profile.cgpa === null ||
      profile.cgpa === undefined
    ) {
      return 'CGPA / Percentage is required.';
    }

    if (
      profile.graduationYear === '' ||
      profile.graduationYear === null ||
      profile.graduationYear === undefined
    ) {
      return 'Graduation Year is required.';
    }

    if (
      !Array.isArray(profile.skills) ||
      profile.skills.length === 0
    ) {
      return 'Please add at least one skill.';
    }

    if (
      !Array.isArray(profile.interests) ||
      profile.interests.length === 0
    ) {
      return 'Please add at least one interest.';
    }

    if (!profile.preferredLocations?.trim()) {
      return 'Preferred Location is required.';
    }

    if (!profile.preferredWorkMode?.trim()) {
      return 'Preferred Work Mode is required.';
    }

    if (!profile.preferredIndustries?.trim()) {
      return 'Preferred Industries are required.';
    }

    if (!profile.preferredRoles?.trim()) {
      return 'Preferred Role is required.';
    }

    if (
      !Array.isArray(profile.projects) ||
      profile.projects.length === 0
    ) {
      return 'Please add at least one project.';
    }

    return null;
  };

  // =========================================================
  // SAVE
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage({
      type: '',
      text: ''
    });

    const validationError =
      validateProfile();

    if (validationError) {
      setMessage({
        type: 'danger',
        text: validationError
      });

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      return;
    }

    try {
      setSaving(true);

      const res = await api.put(
        '/students/me',
        profile
      );

      setProfile(prev => ({
        ...prev,
        ...res.data
      }));

      setMessage({
        type: 'success',
        text:
          'Profile saved successfully! AI Recommendations updated.'
      });

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    } catch (err) {
      console.error(
        'Profile save error:',
        err
      );

      setMessage({
        type: 'danger',
        text:
          err.response?.data?.message ||
          'Failed to save profile.'
      });

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div
        style={{
          padding: '3rem',
          textAlign: 'center'
        }}
      >
        Loading student profile...
      </div>
    );
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        paddingBottom: '2rem'
      }}
    >

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        className="card"
        style={{
          marginBottom: '1.5rem',
          background: '#f8fafc'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >

          <div>
            <h2>My Student Profile</h2>

            <p
              style={{
                color: 'var(--text-muted)'
              }}
            >
              Complete your education, skills,
              interests, preferences and projects
              for accurate AI internship recommendations.
            </p>
          </div>

          <div
            style={{
              textAlign: 'right'
            }}
          >
            <span
              style={{
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              Completion:{' '}
              {profile.completionPercentage || 0}%
            </span>

            <div
              className="progress-container"
              style={{
                width: '160px',
                height: '10px',
                marginTop: '4px'
              }}
            >
              <div
                className="progress-bar"
                style={{
                  width: `${Math.min(
                    100,
                    profile.completionPercentage || 0
                  )}%`
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          MESSAGE
      ====================================================== */}

      {message.text && (
        <div
          className={`alert alert-${message.type}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}
        >
          {message.type === 'success'
            ? <CheckCircle size={18} />
            : <AlertCircle size={18} />
          }

          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* ===================================================
            PERSONAL & EDUCATION
        =================================================== */}

        <div
          className="card"
          style={{
            marginBottom: '1.5rem'
          }}
        >

          <h3
            style={{
              marginBottom: '1rem',
              borderBottom:
                '1px solid var(--border)',
              paddingBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <GraduationCap size={22} />
            Personal & Education Information
          </h3>

          <div className="grid grid-cols-3">

            {/* AGE */}

            <div className="form-group">
              <label className="form-label">
                Age
                <span
                  style={{
                    color: 'var(--text-muted)',
                    fontWeight: '400',
                    marginLeft: '5px'
                  }}
                >
                  (Optional)
                </span>
              </label>

              <input
                type="number"
                className="form-control"
                name="age"
                value={profile.age}
                onChange={handleInputChange}
                placeholder="e.g. 21"
              />
            </div>

            {/* GENDER */}

            <div className="form-group">
              <label className="form-label">
                Gender
                <span
                  style={{
                    color: 'var(--text-muted)',
                    fontWeight: '400',
                    marginLeft: '5px'
                  }}
                >
                  (Optional)
                </span>
              </label>

              <select
                className="form-control"
                name="gender"
                value={profile.gender}
                onChange={handleInputChange}
              >
                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            {/* EDUCATION LEVEL */}

            <div className="form-group">
              <label className="form-label">
                Education Level *
              </label>

              <select
                className="form-control"
                name="educationLevel"
                value={profile.educationLevel}
                onChange={handleInputChange}
                required
              >
                <option value="">
                  Select Education Level
                </option>

                {educationLevels.map(level => (
                  <option
                    key={level}
                    value={level}
                  >
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* DEGREE */}

            <div className="form-group">
              <label className="form-label">
                Degree *
              </label>

              <select
                className="form-control"
                name="degree"
                value={profile.degree}
                onChange={handleInputChange}
                required
              >
                <option value="">
                  Select Degree
                </option>

                {degrees.map(degree => (
                  <option
                    key={degree}
                    value={degree}
                  >
                    {degree}
                  </option>
                ))}
              </select>
            </div>

            {/* BRANCH */}

            <div className="form-group">
              <label className="form-label">
                Branch / Field *
              </label>

              <select
                className="form-control"
                name="branch"
                value={profile.branch}
                onChange={handleInputChange}
                required
              >
                <option value="">
                  Select Branch / Field
                </option>

                {branches.map(branch => (
                  <option
                    key={branch}
                    value={branch}
                  >
                    {branch}
                  </option>
                ))}
              </select>
            </div>

            {/* INSTITUTION */}

            <div className="form-group">
              <label className="form-label">
                Institution / College *
              </label>

              <input
                type="text"
                className="form-control"
                name="institution"
                value={profile.institution}
                onChange={handleInputChange}
                placeholder="e.g. BVC Institute of Technology"
                required
              />
            </div>

            {/* CGPA */}

            <div className="form-group">
              <label className="form-label">
                CGPA / Percentage *
              </label>

              <input
                type="number"
                step="0.01"
                className="form-control"
                name="cgpa"
                value={profile.cgpa}
                onChange={handleInputChange}
                placeholder="e.g. 8.5"
                required
              />
            </div>

            {/* GRADUATION YEAR */}

            <div className="form-group">
              <label className="form-label">
                Graduation Year *
              </label>

              <input
                type="number"
                className="form-control"
                name="graduationYear"
                value={profile.graduationYear}
                onChange={handleInputChange}
                placeholder="e.g. 2027"
                required
              />
            </div>

          </div>
        </div>

        {/* ===================================================
            SKILLS
        =================================================== */}

        <div
          className="card"
          style={{
            marginBottom: '1.5rem'
          }}
        >

          <h3
            style={{
              marginBottom: '1rem',
              borderBottom:
                '1px solid var(--border)',
              paddingBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Code size={22} />
            Technical & Soft Skills *
          </h3>

          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              marginBottom: '1rem'
            }}
          >
            Select at least one skill from the dropdown.
          </p>

          {/* SELECTED SKILLS */}

          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}
          >

            {profile.skills.map(
              (skill, index) => (
                <span
                  key={index}
                  className="badge badge-info"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.45rem 0.75rem',
                    fontSize: '0.85rem'
                  }}
                >
                  {skill.name}
                  {' '}
                  ({skill.proficiency})

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveSkill(index)
                    }
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#1e40af',
                      padding: 0,
                      fontSize: '1rem'
                    }}
                  >
                    ×
                  </button>
                </span>
              )
            )}

          </div>

          {/* ADD SKILL */}

          <div
            className="grid grid-cols-3"
            style={{
              background: '#f8fafc',
              padding: '1rem',
              borderRadius: '8px'
            }}
          >

            <select
              className="form-control"
              value={newSkill.name}
              onChange={(e) =>
                setNewSkill({
                  ...newSkill,
                  name: e.target.value
                })
              }
            >
              <option value="">
                Select Skill
              </option>

              {skillOptions.map(skill => (
                <option
                  key={skill}
                  value={skill}
                >
                  {skill}
                </option>
              ))}
            </select>

            <select
              className="form-control"
              value={newSkill.proficiency}
              onChange={(e) =>
                setNewSkill({
                  ...newSkill,
                  proficiency: e.target.value
                })
              }
            >
              <option value="BEGINNER">
                Beginner
              </option>

              <option value="INTERMEDIATE">
                Intermediate
              </option>

              <option value="ADVANCED">
                Advanced
              </option>

              <option value="EXPERT">
                Expert
              </option>
            </select>

            <button
              type="button"
              onClick={handleAddSkill}
              className="btn btn-secondary btn-sm"
            >
              <Plus size={16} />
              Add Skill
            </button>

          </div>

        </div>

        {/* ===================================================
            INTERESTS & PREFERENCES
        =================================================== */}

        <div
          className="card"
          style={{
            marginBottom: '1.5rem'
          }}
        >

          <h3
            style={{
              marginBottom: '1rem',
              borderBottom:
                '1px solid var(--border)',
              paddingBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Heart size={22} />
            Interests & Preferences *
          </h3>

          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              marginBottom: '1rem'
            }}
          >
            Select your interests and internship preferences.
            Career Goal is optional.
          </p>

          {/* INTERESTS */}

          <label className="form-label">
            Interests *
          </label>

          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}
          >

            {profile.interests.map(
              (interest, index) => (
                <span
                  key={index}
                  className="badge badge-success"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.45rem 0.75rem',
                    fontSize: '0.85rem'
                  }}
                >
                  {interest}

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveInterest(index)
                    }
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#065f46',
                      padding: 0
                    }}
                  >
                    ×
                  </button>
                </span>
              )
            )}

          </div>

          {/* ADD INTEREST */}

          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}
          >

            <select
              className="form-control"
              value={newInterest}
              onChange={(e) =>
                setNewInterest(e.target.value)
              }
            >
              <option value="">
                Select Interest
              </option>

              {interestOptions.map(interest => (
                <option
                  key={interest}
                  value={interest}
                >
                  {interest}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleAddInterest}
              className="btn btn-secondary btn-sm"
              style={{
                flexShrink: 0
              }}
            >
              <Plus size={16} />
              Add Interest
            </button>

          </div>

          {/* PREFERENCES */}

          <div className="grid grid-cols-2">

            {/* LOCATION */}

            <div className="form-group">
              <label className="form-label">
                Preferred Location *
              </label>

              <select
                className="form-control"
                name="preferredLocations"
                value={profile.preferredLocations}
                onChange={handleInputChange}
                required
              >
                <option value="">
                  Select Preferred Location
                </option>

                {locationOptions.map(location => (
                  <option
                    key={location}
                    value={location}
                  >
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* WORK MODE */}

            <div className="form-group">
              <label className="form-label">
                Preferred Work Mode *
              </label>

              <select
                className="form-control"
                name="preferredWorkMode"
                value={profile.preferredWorkMode}
                onChange={handleInputChange}
                required
              >
                <option value="">
                  Select Work Mode
                </option>

                {workModeOptions.map(mode => (
                  <option
                    key={mode.value}
                    value={mode.value}
                  >
                    {mode.label}
                  </option>
                ))}
              </select>
            </div>

            {/* INDUSTRIES */}

            <div className="form-group">
              <label className="form-label">
                Preferred Industries *
              </label>

              <select
                className="form-control"
                name="preferredIndustries"
                value={profile.preferredIndustries}
                onChange={handleInputChange}
                required
              >
                <option value="">
                  Select Industry
                </option>

                <option value="IT">
                  Information Technology
                </option>

                <option value="FinTech">
                  FinTech
                </option>

                <option value="Healthcare">
                  Healthcare
                </option>

                <option value="Education">
                  Education
                </option>

                <option value="Finance">
                  Finance
                </option>

                <option value="Banking">
                  Banking
                </option>

                <option value="E-Commerce">
                  E-Commerce
                </option>

                <option value="Government">
                  Government
                </option>

                <option value="Telecommunications">
                  Telecommunications
                </option>

                <option value="Manufacturing">
                  Manufacturing
                </option>

                <option value="Automotive">
                  Automotive
                </option>

                <option value="Media">
                  Media
                </option>

                <option value="Consulting">
                  Consulting
                </option>
              </select>
            </div>

            {/* ROLES */}

            <div className="form-group">
              <label className="form-label">
                Preferred Role *
              </label>

              <select
                className="form-control"
                name="preferredRoles"
                value={profile.preferredRoles}
                onChange={handleInputChange}
                required
              >
                <option value="">
                  Select Preferred Role
                </option>

                {roleOptions.map(role => (
                  <option
                    key={role}
                    value={role}
                  >
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* CAREER GOAL */}

            <div
              className="form-group"
              style={{
                gridColumn: '1 / -1'
              }}
            >
              <label className="form-label">
                Career Goal
                <span
                  style={{
                    color: 'var(--text-muted)',
                    fontWeight: '400',
                    marginLeft: '5px'
                  }}
                >
                  (Optional)
                </span>
              </label>

              <input
                type="text"
                className="form-control"
                name="careerGoal"
                value={profile.careerGoal}
                onChange={handleInputChange}
                placeholder="e.g. Become a Senior Backend Engineer"
              />
            </div>

          </div>

        </div>

        {/* ===================================================
            PROJECTS
        =================================================== */}

        <div
          className="card"
          style={{
            marginBottom: '1.5rem'
          }}
        >

          <h3
            style={{
              marginBottom: '1rem',
              borderBottom:
                '1px solid var(--border)',
              paddingBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Briefcase size={22} />
            Projects *
          </h3>

          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              marginBottom: '1rem'
            }}
          >
            Add at least one project.
          </p>

          {/* EXISTING PROJECTS */}

          {profile.projects.map(
            (project, index) => (
              <div
                key={index}
                style={{
                  background: '#f8fafc',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}
              >

                <div>

                  <strong>
                    {project.name}
                  </strong>

                  {project.technologies && (
                    <span
                      style={{
                        color: 'var(--text-muted)'
                      }}
                    >
                      {' '}— {project.technologies}
                    </span>
                  )}

                  {project.description && (
                    <p
                      style={{
                        fontSize: '0.85rem',
                        marginTop: '0.4rem',
                        color: 'var(--text-muted)'
                      }}
                    >
                      {project.description}
                    </p>
                  )}

                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleRemoveProject(index)
                  }
                  className="btn btn-danger btn-sm"
                >
                  <Trash2 size={14} />
                </button>

              </div>
            )
          )}

          {/* ADD PROJECT */}

          <div
            style={{
              background: '#f8fafc',
              padding: '1rem',
              borderRadius: '8px'
            }}
          >

            <div
              className="grid grid-cols-2"
              style={{
                marginBottom: '0.5rem'
              }}
            >

              {/* PROJECT NAME */}

              <input
                type="text"
                className="form-control"
                placeholder="Project Name *"
                value={newProject.name}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    name: e.target.value
                  })
                }
              />

              {/* PROJECT TECHNOLOGIES DROPDOWN */}

              <select
                className="form-control"
                value={newProject.technologies}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    technologies: e.target.value
                  })
                }
              >
                <option value="">
                  Select Project Technology *
                </option>

                {technologyOptions.map(
                  technology => (
                    <option
                      key={technology}
                      value={technology}
                    >
                      {technology}
                    </option>
                  )
                )}
              </select>

            </div>

            {/* DESCRIPTION */}

            <textarea
              className="form-control"
              placeholder="Project Description *"
              rows="3"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  description: e.target.value
                })
              }
              style={{
                marginBottom: '0.5rem'
              }}
            />

            <button
              type="button"
              onClick={handleAddProject}
              className="btn btn-secondary btn-sm"
            >
              <Plus size={16} />
              Add Project
            </button>

          </div>

        </div>

        {/* ===================================================
            SAVE
        =================================================== */}

        <button
          type="submit"
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '0.9rem',
            fontSize: '1rem'
          }}
          disabled={saving}
        >
          <Save size={18} />

          {saving
            ? 'Saving Profile...'
            : 'Save & Update AI Recommendations'
          }
        </button>

      </form>

    </div>
  );
};

export default StudentProfile;