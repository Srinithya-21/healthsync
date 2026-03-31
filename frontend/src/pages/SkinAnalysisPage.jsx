// Skin Analysis Page
import React, { useState, useEffect } from 'react';
import { FiUpload, FiTrash2, FiCamera } from 'react-icons/fi';
import { skinService } from '../services/api';

export default function SkinAnalysisPage() {
  const [analyses, setAnalyses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    loadAnalyses();
  }, []);

  const loadAnalyses = async () => {
    try {
      setLoading(true);
      const response = await skinService.getHistory();
      setAnalyses(response.data.data);
    } catch (error) {
      console.error('Error loading analyses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert file to base64 URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      alert('Please select an image');
      return;
    }

    try {
      setAnalyzing(true);
      await skinService.analyzeSkin({
        imageUrl,
        notes
      });
      setShowForm(false);
      setImageUrl('');
      setNotes('');
      setPreviewUrl(null);
      loadAnalyses();
    } catch (error) {
      console.error('Error analyzing skin:', error);
      alert('Error analyzing image');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDelete = async (analysisId) => {
    if (window.confirm('Delete this analysis?')) {
      try {
        await skinService.deleteAnalysis(analysisId);
        loadAnalyses();
      } catch (error) {
        console.error('Error deleting analysis:', error);
      }
    }
  };

  const getConcernColor = (severity) => {
    const colors = { mild: 'bg-yellow-100', moderate: 'bg-orange-100', severe: 'bg-red-100' };
    return colors[severity] || 'bg-gray-100';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Skin Analysis Scanner 📸</h1>
          <p className="text-gray-600">Analyze your skin and get recommendations</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          <FiUpload /> Analyze Skin
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card mb-8">
          <h3 className="text-lg font-semibold mb-4">Upload Image for Analysis</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Preview */}
            {previewUrl ? (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full max-h-96 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewUrl(null);
                    setImageUrl('');
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FiCamera className="mx-auto text-4xl text-gray-400 mb-2" />
                <p className="text-gray-600 mb-4">Upload a photo or take a selfie for analysis</p>
                <label className="btn-primary cursor-pointer inline-block">
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="label">Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific concerns? (acne, dryness, etc.)"
                className="input-field"
                rows="3"
              ></textarea>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={analyzing || !imageUrl}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {analyzing ? 'Analyzing...' : 'Analyze Image'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setImageUrl('');
                  setNotes('');
                  setPreviewUrl(null);
                }}
                className="btn-outline flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Analysis Results */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        ) : analyses.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-gray-500 mb-4">No analyses yet. Upload an image to get started!</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              <FiUpload className="mr-2" /> Start Analysis
            </button>
          </div>
        ) : (
          analyses.map((analysis) => (
            <div key={analysis._id} className="card">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Image */}
                <div>
                  <img
                    src={analysis.imageUrl}
                    alt="Analysis"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(analysis.analysisDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Results */}
                <div className="md:col-span-2">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold">Analysis Results</h3>
                    <button
                      onClick={() => handleDelete(analysis._id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                  {/* Concerns */}
                  {analysis.concerns && analysis.concerns.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Detected Concerns:</h4>
                      <div className="space-y-2">
                        {analysis.concerns.map((concern, idx) => (
                          <div key={idx} className={`p-3 rounded-lg ${getConcernColor(concern.severity)}`}>
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-semibold capitalize">{concern.concern.replace('_', ' ')}</p>
                                <p className="text-xs opacity-75">
                                  Severity: {concern.severity}
                                  {concern.confidence && ` • Confidence: ${concern.confidence}%`}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  {analysis.recommendations && analysis.recommendations.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Recommendations:</h4>
                      <ul className="space-y-2">
                        {analysis.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex gap-2 text-sm">
                            <span className="text-green-500 font-bold">✓</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Notes */}
                  {analysis.notes && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Notes:</strong> {analysis.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
