import { useState } from "react";
import axiosInstance from "../../services/intercepor";
import { toast } from "react-toastify";

const AddApp = () => {
  const [formData, setFormData] = useState({
    appName: '',
    appLink: '',
    category: '',
    subcategory: '',
    appImage: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = {
    entertainment: ['Games', 'Music', 'Video', 'Social'],
    productivity: ['Office', 'Documentation', 'Communication', 'Organization'],
    education: ['Languages', 'Programming', 'Science', 'Mathematics'],
    utility: ['Tools', 'Security', 'System', 'Network']
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.appName.trim()) newErrors.appName = 'App name is required';
    if (!formData.appLink.trim()) newErrors.appLink = 'App link is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.subcategory) newErrors.subcategory = 'Subcategory is required';
    if (!formData.appImage) newErrors.appImage = 'App image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.appName);
    formDataToSubmit.append('app_link', formData.appLink);
    formDataToSubmit.append('category', formData.category);
    formDataToSubmit.append('sub_category', formData.subcategory);
    formDataToSubmit.append('image', formData.appImage);

    try {
      console.log('Sending form data:', Object.fromEntries(formDataToSubmit));
      const response = await axiosInstance.post('/apps/',formDataToSubmit)
      toast.success('App Added Successfully')
      setFormData({
        appName: '',
        appLink: '',
        category: '',
        subcategory: '',
        appImage: null,
      });
      setPreview(null);
    } catch (error) {

      console.error('Error submitting form:', error);
      toast.error('Error happened when create app')
      if (error.response) {
        // You can capture validation errors from the API
        setErrors(error.response.data);
      }

    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'category') {
      setFormData(prev => ({ ...prev, subcategory: '' }));
    }
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, appImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      if (errors.appImage) {
        setErrors(prev => ({ ...prev, appImage: '' }));
      }
    }
  };

  return (
    <div className="add-app-container">
      <div className="page-header">
        <h2>Add New Application</h2>
        <p>Add a new application to the catalog</p>
      </div>

      <form onSubmit={handleSubmit} className="app-form">
        <div className="form-grid">
          <div className="image-section">
            <div className="image-upload">
              <input
                type="file"
                id="appImage"
                onChange={handleImageChange}
                accept="image/*"
                className="image-input"
              />
              <label htmlFor="appImage" className="image-label">
                {preview ? (
                  <img src={preview} alt="App preview" className="image-preview" />
                ) : (
                  <div className="upload-placeholder">
                    <span>Click to upload app image</span>
                    <small>PNG, JPG up to 2MB</small>
                  </div>
                )}
              </label>
              {errors.appImage && <span className="error">{errors.appImage}</span>}
            </div>
          </div>

          <div className="details-section">
            <div className="form-group">
              <label htmlFor="appName">Application Name</label>
              <input
                type="text"
                id="appName"
                value={formData.appName}
                onChange={handleChange('appName')}
                className={errors.appName ? 'error-input' : ''}
              />
              {errors.appName && <span className="error">{errors.appName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="appLink">Application Link</label>
              <input
                type="url"
                id="appLink"
                value={formData.appLink}
                onChange={handleChange('appLink')}
                className={errors.appLink ? 'error-input' : ''}
              />
              {errors.appLink && <span className="error">{errors.appLink}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={formData.category}
                onChange={handleChange('category')}
                className={errors.category ? 'error-input' : ''}
              >
                <option value="">Select Category</option>
                {Object.keys(categories).map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              {errors.category && <span className="error">{errors.category}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="subcategory">Subcategory</label>
              <select
                id="subcategory"
                value={formData.subcategory}
                onChange={handleChange('subcategory')}
                className={errors.subcategory ? 'error-input' : ''}
                disabled={!formData.category}
              >
                <option value="">Select Subcategory</option>
                {formData.category && categories[formData.category].map(sub => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              {errors.subcategory && <span className="error">{errors.subcategory}</span>}
            </div>

          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => window.history.back()}>
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Adding...' : 'Add Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddApp;