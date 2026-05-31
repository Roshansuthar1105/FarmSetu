// components/admin/AdminNewsletter.jsx (Updated with Preview)
import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { 
  FaUsers, 
  FaEnvelope, 
  FaPaperPlane, 
  FaDownload, 
  FaTrash,
  FaChartLine,
  FaSpinner,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaEyeSlash
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import EmailPreview from '../../components/admin/EmailPreview';

const AdminNewsletter = () => {
    const { BACKEND_URL, authUser } = useAuthContext();
    const [activeTab, setActiveTab] = useState('subscribers');
    const [subscribers, setSubscribers] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    
    // Email form state
    const [emailForm, setEmailForm] = useState({
        subject: '',
        content: '',
        contentType: 'html',
        sendTo: 'active',
        testEmail: ''
    });
    
    // Rich text editor state
    const [showRichEditor, setShowRichEditor] = useState(false);
    
    // Fetch subscribers
    const fetchSubscribers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${BACKEND_URL}/api/admin/newsletter/subscribers`, {
                headers: { 'Authorization': `Bearer ${authUser?.token}` }
            });
            const data = await res.json();
            if (data.success) {
                setSubscribers(data.subscribers);
            }
        } catch (error) {
            toast.error('Failed to fetch subscribers');
            console.log("Error : ",error)
        } finally {
            setLoading(false);
        }
    };
    
    // Fetch stats
    const fetchStats = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/admin/newsletter/stats`, {
                headers: { 'Authorization': `Bearer ${authUser?.token}` }
            });
            const data = await res.json();
            if (data.success) {
                setStats(data.stats);
            }
        } catch (error) {
            console.error('Failed to fetch stats', error);
        }
    };
    
    useEffect(() => {
        fetchStats();
        if (activeTab === 'subscribers') {
            fetchSubscribers();
        }
    }, [activeTab]);
    
    // Handle send bulk email
    const handleSendBulkEmail = async (e) => {
        e.preventDefault();
        
        if (!emailForm.subject || !emailForm.content) {
            toast.error('Please fill in subject and content');
            return;
        }
        
        setSending(true);
        const loadingToast = toast.loading('Sending emails...');
        
        try {
            const res = await fetch(`${BACKEND_URL}/api/admin/newsletter/send-bulk`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authUser?.token}`
                },
                body: JSON.stringify({
                    subject: emailForm.subject,
                    content: emailForm.content,
                    contentType: emailForm.contentType,
                    sendTo: emailForm.sendTo
                })
            });
            
            const data = await res.json();
            toast.dismiss(loadingToast);
            
            if (data.success) {
                toast.success(data.message);
                setEmailForm({ ...emailForm, subject: '', content: '' });
            } else {
                toast.error(data.error || 'Failed to send emails');
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error('Failed to send emails');
        } finally {
            setSending(false);
        }
    };
    
    // Handle send test email
    const handleSendTestEmail = async () => {
        if (!emailForm.testEmail || !emailForm.subject || !emailForm.content) {
            toast.error('Please fill in test email, subject, and content');
            return;
        }
        
        setSending(true);
        try {
            const res = await fetch(`${BACKEND_URL}/api/admin/newsletter/send-test`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authUser?.token}`
                },
                body: JSON.stringify({
                    testEmail: emailForm.testEmail,
                    subject: emailForm.subject,
                    content: emailForm.content,
                    contentType: emailForm.contentType
                })
            });
            
            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.error || 'Failed to send test email');
            }
        } catch (error) {
            toast.error('Failed to send test email');
        } finally {
            setSending(false);
        }
    };
    
    // Handle delete subscriber
    const handleDeleteSubscriber = async (id, email) => {
        if (!window.confirm(`Delete subscriber ${email}?`)) return;
        
        try {
            const res = await fetch(`${BACKEND_URL}/api/admin/newsletter/subscriber/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authUser?.token}` }
            });
            
            const data = await res.json();
            if (data.success) {
                toast.success('Subscriber deleted');
                fetchSubscribers();
                fetchStats();
            }
        } catch (error) {
            toast.error('Failed to delete subscriber');
        }
    };
    
    // Handle export CSV
    const handleExportCSV = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/admin/newsletter/export-csv`, {
                headers: { 'Authorization': `Bearer ${authUser?.token}` }
            });
            
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `newsletter_subscribers_${Date.now()}.csv`;
            a.click();
            window.URL.revokeObjectURL(url);
            
            toast.success('Export started');
        } catch (error) {
            toast.error('Failed to export');
        }
    };

    // Rich text editor helpers
    const insertHTML = (tag) => {
        const textarea = document.getElementById('emailContent');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = emailForm.content;
        let selectedText = text.substring(start, end);
        
        let newText = '';
        switch(tag) {
            case 'h1':
                newText = `<h1>${selectedText || 'Heading 1'}</h1>`;
                break;
            case 'h2':
                newText = `<h2>${selectedText || 'Heading 2'}</h2>`;
                break;
            case 'p':
                newText = `<p>${selectedText || 'Paragraph text here...'}</p>`;
                break;
            case 'bold':
                newText = `<strong>${selectedText || 'bold text'}</strong>`;
                break;
            case 'italic':
                newText = `<em>${selectedText || 'italic text'}</em>`;
                break;
            case 'link':
                newText = `<a href="#" style="color: #4CAF50;">${selectedText || 'link text'}</a>`;
                break;
            case 'ul':
                newText = `<ul>\n  <li>${selectedText || 'List item 1'}</li>\n  <li>List item 2</li>\n</ul>`;
                break;
            case 'button':
                newText = `<div style="text-align: center; margin: 20px 0;">
                    <a href="#" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                        ${selectedText || 'Click Here'}
                    </a>
                </div>`;
                break;
            case 'image':
                newText = `<img src="image-url.jpg" alt="${selectedText || 'Image description'}" style="max-width: 100%; height: auto;">`;
                break;
            default:
                return;
        }
        
        const newContent = text.substring(0, start) + newText + text.substring(end);
        setEmailForm({...emailForm, content: newContent});
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-white">Newsletter Management</h1>
            
            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-blue-100 text-sm">Total Subscribers</p>
                                <p className="text-3xl font-bold text-white mt-2">{stats.total}</p>
                            </div>
                            <FaUsers className="text-4xl text-blue-200 opacity-80" />
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 shadow-lg">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-green-100 text-sm">Active Subscribers</p>
                                <p className="text-3xl font-bold text-white mt-2">{stats.active}</p>
                            </div>
                            <FaCheckCircle className="text-4xl text-green-200 opacity-80" />
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl p-6 shadow-lg">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-yellow-100 text-sm">New This Week</p>
                                <p className="text-3xl font-bold text-white mt-2">+{stats.newThisWeek}</p>
                            </div>
                            <FaChartLine className="text-4xl text-yellow-200 opacity-80" />
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 shadow-lg">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-purple-100 text-sm">Inactive</p>
                                <p className="text-3xl font-bold text-white mt-2">{stats.inactive}</p>
                            </div>
                            <FaTimesCircle className="text-4xl text-purple-200 opacity-80" />
                        </div>
                    </div>
                </div>
            )}
            
            {/* Tabs */}
            <div className="flex space-x-2 border-b border-gray-700">
                <button
                    onClick={() => setActiveTab('subscribers')}
                    className={`px-6 py-3 font-medium transition-all ${
                        activeTab === 'subscribers'
                            ? 'text-green-400 border-b-2 border-green-400'
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <FaUsers className="inline mr-2" />
                    Subscribers
                </button>
                <button
                    onClick={() => setActiveTab('compose')}
                    className={`px-6 py-3 font-medium transition-all ${
                        activeTab === 'compose'
                            ? 'text-green-400 border-b-2 border-green-400'
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <FaEnvelope className="inline mr-2" />
                    Compose Email
                </button>
            </div>
            
            {/* Subscribers List */}
            {activeTab === 'subscribers' && (
                <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Subscriber List</h3>
                        <button
                            onClick={handleExportCSV}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            <FaDownload /> Export CSV
                        </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-900 text-gray-400 text-xs uppercase">
                                <tr>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">Subscribed Date</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {loading ? (
                                    <tr><td colSpan="4" className="text-center py-8">Loading...</td></tr>
                                ) : subscribers.length === 0 ? (
                                    <tr><td colSpan="4" className="text-center py-8 text-gray-500">No subscribers found</td></tr>
                                ) : (
                                    subscribers.map(sub => (
                                        <tr key={sub._id} className="hover:bg-gray-700/50">
                                            <td className="px-6 py-4 text-white">{sub.email}</td>
                                            <td className="px-6 py-4 text-gray-400">
                                                {new Date(sub.subscribedAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    sub.isActive 
                                                        ? 'bg-green-900 text-green-300' 
                                                        : 'bg-red-900 text-red-300'
                                                }`}>
                                                    {sub.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDeleteSubscriber(sub._id, sub.email)}
                                                    className="text-red-400 hover:text-red-300 p-2"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                         </table>
                    </div>
                </div>
            )}
            
            {/* Compose Email */}
            {activeTab === 'compose' && (
                <div className="space-y-6">
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white">Compose Newsletter</h3>
                            <button
                                type="button"
                                onClick={() => setShowRichEditor(!showRichEditor)}
                                className="text-blue-400 hover:text-blue-300 text-sm"
                            >
                                {showRichEditor ? 'Hide Rich Editor' : 'Show Rich Editor'}
                            </button>
                        </div>
                        
                        <form onSubmit={handleSendBulkEmail} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 mb-2">Send To</label>
                                <select
                                    value={emailForm.sendTo}
                                    onChange={(e) => setEmailForm({...emailForm, sendTo: e.target.value})}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
                                >
                                    <option value="all">All Subscribers</option>
                                    <option value="active">Active Subscribers Only</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-gray-400 mb-2">Subject</label>
                                <input
                                    type="text"
                                    value={emailForm.subject}
                                    onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
                                    placeholder="Newsletter Subject"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-gray-400 mb-2">Content Type</label>
                                <select
                                    value={emailForm.contentType}
                                    onChange={(e) => setEmailForm({...emailForm, contentType: e.target.value})}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
                                >
                                    <option value="html">HTML (Rich Text)</option>
                                    <option value="text">Plain Text</option>
                                </select>
                            </div>
                            
                            {/* Rich Text Editor Toolbar */}
                            {emailForm.contentType === 'html' && showRichEditor && (
                                <div className="bg-gray-700 rounded-lg p-3">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <button type="button" onClick={() => insertHTML('h1')} className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm">H1</button>
                                        <button type="button" onClick={() => insertHTML('h2')} className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm">H2</button>
                                        <button type="button" onClick={() => insertHTML('p')} className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm">P</button>
                                        <button type="button" onClick={() => insertHTML('bold')} className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm font-bold">B</button>
                                        <button type="button" onClick={() => insertHTML('italic')} className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm italic">I</button>
                                        <button type="button" onClick={() => insertHTML('link')} className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm">🔗 Link</button>
                                        <button type="button" onClick={() => insertHTML('ul')} className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm">📋 List</button>
                                        <button type="button" onClick={() => insertHTML('button')} className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm">🔘 Button</button>
                                        <button type="button" onClick={() => insertHTML('image')} className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm">🖼️ Image</button>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        Tip: Select text first, then click a button to wrap it with HTML tags
                                    </div>
                                </div>
                            )}
                            
                            <div>
                                <label className="block text-gray-400 mb-2">Email Content</label>
                                {emailForm.contentType === 'html' ? (
                                    <textarea
                                        id="emailContent"
                                        value={emailForm.content}
                                        onChange={(e) => setEmailForm({...emailForm, content: e.target.value})}
                                        placeholder={`<h1>Hello Farmers!</h1>
<p>Your newsletter content here...</p>

<h2>Latest Updates</h2>
<ul>
  <li>Market prices updated</li>
  <li>New government scheme announced</li>
</ul>

<div style="background-color: #f0f9f0; padding: 15px; border-radius: 8px;">
  <strong>💡 Tip of the week:</strong> Use organic fertilizers for better yield
</div>

<p style="text-align: center;">
  <a href="#" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
    Read More on Website
  </a>
</p>

<p>Happy Farming! 🌱</p>
<p><strong>- Team FarmSetu</strong></p>`}
                                        rows={15}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white font-mono text-sm"
                                    />
                                ) : (
                                    <textarea
                                        value={emailForm.content}
                                        onChange={(e) => setEmailForm({...emailForm, content: e.target.value})}
                                        placeholder={`Hello Farmers!

Your newsletter content here...

Latest Updates:
- Market prices updated
- New government scheme announced

💡 Tip of the week: Use organic fertilizers for better yield

Read more on our website: https://farmsetu.com

Happy Farming! 🌱
- Team FarmSetu`}
                                        rows={15}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
                                    />
                                )}
                            </div>
                            
                            {/* Preview Button */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowPreview(true)}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                >
                                    <FaEye /> Preview Email
                                </button>
                            </div>
                            
                            {/* Test Email Section */}
                            <div className="border-t border-gray-700 pt-4 mt-4">
                                <h4 className="text-md font-semibold text-gray-300 mb-3">Send Test Email</h4>
                                <div className="flex gap-4">
                                    <input
                                        type="email"
                                        value={emailForm.testEmail}
                                        onChange={(e) => setEmailForm({...emailForm, testEmail: e.target.value})}
                                        placeholder="test@example.com"
                                        className="flex-1 bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSendTestEmail}
                                        disabled={sending}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg disabled:opacity-50"
                                    >
                                        {sending ? <FaSpinner className="animate-spin" /> : 'Send Test'}
                                    </button>
                                </div>
                            </div>
                            
                            <button
                                type="submit"
                                disabled={sending}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {sending ? (
                                    <><FaSpinner className="animate-spin" /> Sending...</>
                                ) : (
                                    <><FaPaperPlane /> Send to {emailForm.sendTo === 'all' ? 'All' : 'Active'} Subscribers</>
                                )}
                            </button>
                        </form>
                    </div>
                    
                    {/* HTML Email Template Examples */}
                    <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-6">
                        <h4 className="text-blue-400 font-semibold mb-3">📧 HTML Email Templates</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setEmailForm({
                                        ...emailForm,
                                        subject: "🌾 Monthly Farming Digest - " + new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
                                        content: `<!DOCTYPE html>
<html>
<head>
<style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
    .header { background: linear-gradient(135deg, #4CAF50, #2E7D32); color: white; padding: 30px 20px; text-align: center; }
    .content { padding: 30px 20px; }
    .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
    .button { background: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
    .card { background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 15px 0; }
</style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌾 FarmSetu Monthly Digest</h1>
            <p>${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
        </div>
        <div class="content">
            <h2>Hello Farmer! 👋</h2>
            <p>Here's your monthly update from FarmSetu:</p>
            
            <div class="card">
                <h3>📊 Market Price Updates</h3>
                <ul>
                    <li>Wheat: ₹2,450/quintal ↑ 5%</li>
                    <li>Rice: ₹3,200/quintal → Stable</li>
                    <li>Maize: ₹2,100/quintal ↓ 2%</li>
                </ul>
            </div>
            
            <div class="card">
                <h3>🏦 New Government Schemes</h3>
                <p>PM-KISAN 18th installment to be released next week. Check eligibility on our portal.</p>
            </div>
            
            <div class="card">
                <h3>🌱 Farming Tips</h3>
                <p>This month's focus: <strong>Organic Pest Control</strong> - Use neem oil spray for common pests.</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://farmsetu.com" class="button">Visit Website →</a>
            </div>
        </div>
        <div class="footer">
            <p>You received this email because you subscribed to FarmSetu newsletter.</p>
            <p><a href="{{unsubscribe_link}}">Unsubscribe</a></p>
            <p>© ${new Date().getFullYear()} FarmSetu. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`
                                    });
                                    toast.success('Monthly Digest template loaded');
                                }}
                                className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg text-left text-white"
                            >
                                📰 Monthly Digest Template
                            </button>
                            
                            <button
                                type="button"
                                onClick={() => {
                                    setEmailForm({
                                        ...emailForm,
                                        subject: "⚠️ Weather Alert: Heavy Rainfall Expected",
                                        content: `<!DOCTYPE html>
<html>
<head>
<style>
    .alert { background: #ff9800; color: white; padding: 15px; text-align: center; border-radius: 5px; }
    .warning { background: #f44336; color: white; padding: 10px; border-radius: 5px; }
</style>
</head>
<body>
    <div class="container" style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div class="alert">
            <h2>⚠️ Weather Alert</h2>
        </div>
        <div style="padding: 20px;">
            <h2>Heavy Rainfall Expected</h2>
            <p>Dear Farmer,</p>
            <p>The meteorological department has predicted heavy rainfall in your region over the next 48 hours.</p>
            
            <div class="warning">
                <strong>⚠️ Precautionary Measures:</strong>
                <ul>
                    <li>Cover harvested crops</li>
                    <li>Ensure proper drainage in fields</li>
                    <li>Delay fertilizer application</li>
                    <li>Move livestock to higher ground</li>
                </ul>
            </div>
            
            <p>Stay safe and monitor local weather updates regularly.</p>
            
            <div style="text-align: center; margin-top: 20px;">
                <a href="https://farmsetu.com/weather" style="background: #2196F3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                    View Detailed Forecast →
                </a>
            </div>
        </div>
    </div>
</body>
</html>`
                                    });
                                    toast.success('Weather Alert template loaded');
                                }}
                                className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg text-left text-white"
                            >
                                ⚠️ Weather Alert Template
                            </button>
                        </div>
                    </div>
                    
                    {/* Email Template Tips */}
                    <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-6">
                        <h4 className="text-blue-400 font-semibold mb-2">💡 Email Template Tips</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Use clear subject lines (e.g., "🌾 Monthly Farming Updates - March 2024")</li>
                            <li>• Include unsubscribe link in every email (automatically added)</li>
                            <li>• Keep paragraphs short and scannable</li>
                            <li>• Add call-to-action buttons for engagement</li>
                            <li>• Test on mobile devices before sending</li>
                            <li>• Use our pre-built templates for quick starts</li>
                        </ul>
                    </div>
                </div>
            )}
            
            {/* Email Preview Modal */}
            {showPreview && (
                <EmailPreview
                    subject={emailForm.subject}
                    content={emailForm.content}
                    contentType={emailForm.contentType}
                    onClose={() => setShowPreview(false)}
                />
            )}
        </div>
    );
};

export default AdminNewsletter;