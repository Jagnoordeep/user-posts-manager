import React, { useMemo } from 'react';
import { useFetch } from '../../Hooks/useFetch';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend
} from 'recharts';
import { FileText, Tag, ThumbsUp, Eye } from 'lucide-react';


const PostsPerTagBar = ({ data }) => (
  <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
    <div className="flex items-center gap-3 mb-8">
      <div className="p-3 bg-indigo-500/10 rounded-2xl">
        <Tag className="w-7 h-7 text-indigo-500" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Posts by Tag</h2>
        <p className="text-gray-600">Number of posts per tag</p>
      </div>
    </div>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }}
          interval={0}
          angle={-35}
          textAnchor="end"
          height={60}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          tick={{ fontSize: 13, fontWeight: 600, fill: '#64748b' }}
        />
        <Tooltip
          contentStyle={{
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
          }}
        />
        <Legend />
        <Bar dataKey="count" name="Posts" fill="#6366f1" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);


const LikesViewsLine = ({ data }) => (
  <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
    <div className="flex items-center gap-3 mb-8">
      <div className="p-3 bg-emerald-500/10 rounded-2xl">
        <ThumbsUp className="w-7 h-7 text-emerald-500" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Likes & Views by Tag</h2>
        <p className="text-gray-600">Engagement breakdown per tag</p>
      </div>
    </div>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }}
          interval={0}
          angle={-35}
          textAnchor="end"
          height={60}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          tick={{ fontSize: 13, fontWeight: 600, fill: '#64748b' }}
        />
        <Tooltip
          contentStyle={{
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="likes" name="Likes" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
        <Line type="monotone" dataKey="views" name="Views" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);


const PostsChart = () => {
  const { data, loading, error } = useFetch('https://dummyjson.com/posts?limit=100');

  
  const postsPerTagData = useMemo(() => {
    if (!data?.posts) return [];
    const tagMap = {};
    data.posts.forEach(post => {
      post.tags?.forEach(tag => {
        if (!tagMap[tag]) tagMap[tag] = { name: tag, count: 0, likes: 0, views: 0 };
        tagMap[tag].count += 1;
        tagMap[tag].likes += post.reactions?.likes ?? 0;
        tagMap[tag].views += post.views ?? 0;
      });
    });
    return Object.values(tagMap).sort((a, b) => b.count - a.count);
  }, [data]);

  
  const totalLikes = useMemo(() =>
    data?.posts?.reduce((sum, p) => sum + (p.reactions?.likes ?? 0), 0) ?? 0,
    [data]
  );
  const totalViews = useMemo(() =>
    data?.posts?.reduce((sum, p) => sum + (p.views ?? 0), 0) ?? 0,
    [data]
  );
  const totalTags = useMemo(() =>
    new Set(data?.posts?.flatMap(p => p.tags ?? [])).size ?? 0,
    [data]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4"><LoadingSpinner /></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <ErrorMessage message={error} onRetry={() => window.location.reload()} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-3xl shadow-xl border border-white/50 mb-8">
            <FileText className="w-12 h-12 text-indigo-600" />
            <div>
              <h1 className="text-5xl font-black bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                Posts Analytics
              </h1>
              <p className="text-xl text-gray-600 font-semibold">Visualize your posts data</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-linear-to-r from-indigo-500 to-indigo-600 rounded-2xl text-white">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <p className="text-3xl font-black text-gray-900">{data?.posts?.length ?? 0}</p>
                <p className="text-gray-600 font-semibold">Total Posts</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-linear-to-r from-emerald-500 to-emerald-600 rounded-2xl text-white">
                <ThumbsUp className="w-8 h-8" />
              </div>
              <div>
                <p className="text-3xl font-black text-gray-900">{totalLikes.toLocaleString()}</p>
                <p className="text-gray-600 font-semibold">Total Likes</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-linear-to-r from-purple-500 to-purple-600 rounded-2xl text-white">
                <Eye className="w-8 h-8" />
              </div>
              <div>
                <p className="text-3xl font-black text-gray-900">{totalViews.toLocaleString()}</p>
                <p className="text-gray-600 font-semibold">Total Views</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PostsPerTagBar data={postsPerTagData} />
          <LikesViewsLine data={postsPerTagData} />
        </div>

      </div>
    </div>
  );
};

export default PostsChart;
