import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Upload, LogOut, FileText, User, Calendar, 
  Clock, FileUp, AlertCircle, LayoutDashboard,
  Settings, HelpCircle, Plus, Trash2,
  Menu, X, Eye
} from 'lucide-react';
import { format } from 'date-fns';
import { getResumes, uploadResume, deleteResume } from '../lib/api';
import type { Resume } from '../types/resume';

interface DashboardProps {
  token: string;
  onLogout: () => void;
}

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  submissionDate: z.string().min(1, 'Submission date is required'),
  resume: z.any().refine((files) => files?.length === 1, 'Resume is required'),
});

function Dashboard({ token, onLogout }: DashboardProps) {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const username = localStorage.getItem('username');

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    resolver: zodResolver(schema),
  });

  // Watch for file changes
  const fileWatch = watch('resume');
  useEffect(() => {
    if (fileWatch?.[0]) {
      setSelectedFileName(fileWatch[0].name);
    }
  }, [fileWatch]);

  useEffect(() => {
    fetchResumes();
  }, [token]);

  const fetchResumes = async () => {
    try {
      const data = await getResumes(token);
      setResumes(data);
    } catch (err) {
      setError('Failed to fetch resumes');
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('submissionDate', data.submissionDate);
      formData.append('resume', data.resume[0]);

      await uploadResume(formData, token);
      setSuccess('Resume uploaded successfully!');
      setError('');
      setSelectedFileName('');
      reset();
      fetchResumes();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to upload resume');
      setSuccess('');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteResume(id, token);
      setSuccess('Resume deleted successfully!');
      fetchResumes();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete resume');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(files[0]);
        fileInput.files = dataTransfer.files;
        setSelectedFileName(files[0].name);
      }
    }
  };

  const viewResume = (filePath: string) => {
    window.open(`http://localhost:3000/api/uploads/${filePath}`, '_blank');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
        transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:transform-none flex flex-col
      `}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold">Assignment</h1>
          </div>

          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-xl">
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
              <HelpCircle className="w-5 h-5" />
              <span>Help Center</span>
            </a>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{username}</p>
              <p className="text-sm text-gray-500">User</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {username}!</h1>
              <p className="text-gray-600">Assignment for Engineering Intern</p>
            </div>
            
          </div>

          {/* Upload Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Upload Resume</h2>
              
              {(error || success) && (
                <div className={`mb-4 p-4 rounded-lg ${
                  error ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                }`}>
                  {error || success}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('name')}
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Submission Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      {...register('submissionDate')}
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                    {errors.submissionDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.submissionDate.message as string}</p>
                    )}
                  </div>
                </div>

                <div
                  className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    id="resumeUpload"
                    type="file"
                    accept=".pdf"
                    {...register('resume')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <FileUp className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600">
                      Drag and drop your PDF file here, or click to select
                    </p>
                    {selectedFileName && (
                      <p className="mt-2 text-sm font-medium text-blue-600">
                        Selected file: {selectedFileName}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  Upload Resume
                </button>
              </form>
            </div>
          </div>

          {/* Resumes List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">All Resumes</h2>
              <div className="space-y-4">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{resume.name}</p>
                      <p className="text-sm text-gray-500 mb-1">{resume.file_name}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(resume.submission_date), 'MMM d, yyyy')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {format(new Date(resume.upload_date), 'h:mm a')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => viewResume(resume.file_path)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Resume"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                  
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;