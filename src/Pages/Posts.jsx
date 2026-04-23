import React, { useState, useMemo } from 'react';
import { useFetch } from '../Hooks/useFetch';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '../Components/Common/LoadingSpinner';
import ErrorMessage from '../Components/Common/ErrorMessage';
import { FileText, Search, ThumbsUp, ThumbsDown, Eye, Tag } from 'lucide-react';

const Posts = () => {
  const { data, loading, error } = useFetch('https://dummyjson.com/posts?limit=100');
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const allTags = useMemo(() => {
    if (!data?.posts) return [];
    const tags = new Set();
    data.posts.forEach(post => post.tags?.forEach(tag => tags.add(tag)));
    return [...tags].sort();
  }, [data]);

  const filteredPosts = useMemo(() => {
    if (!data?.posts) return [];
    return data.posts.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [data, searchTerm, selectedTag]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleSearch = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };
  const handleTagChange = (e) => { setSelectedTag(e.target.value); setCurrentPage(1); };

  if (loading) return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-20">
      <div className="max-w-7xl mx-auto px-4"><LoadingSpinner /></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-3xl shadow-xl border border-white/50 mb-4">
            <FileText className="w-10 h-10 text-indigo-600" />
            <div className="text-left">
              <h1 className="text-4xl font-black bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {t('posts.title')}
              </h1>
              <p className="text-gray-500 font-medium">{t('posts.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('posts.searchPlaceholder')}
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
              />
            </div>
            <select
              value={selectedTag}
              onChange={handleTagChange}
              className="px-4 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500"
            >
              <option value="">{t('posts.allTags')}</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 font-medium">{t('posts.postsFound', { count: filteredPosts.length })}</p>
          <span className="text-sm text-gray-500">{t('usersList.pageOf', { current: currentPage, total: totalPages })}</span>
        </div>

        {/* Posts Grid */}
        {paginatedPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">{t('posts.noPostsFound')}</h3>
            <p className="text-gray-500">{t('posts.tryAdjusting')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedPosts.map(post => (
              <div
                key={post.id}
                className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags?.map(tag => (
                    <span
                      key={tag}
                      onClick={() => { setSelectedTag(tag); setCurrentPage(1); }}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-xl cursor-pointer hover:bg-indigo-100 transition-colors"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug capitalize">{post.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">{post.body}</p>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <ThumbsUp size={14} className="text-emerald-500" />
                      {post.reactions?.likes ?? 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsDown size={14} className="text-rose-500" />
                      {post.reactions?.dislikes ?? 0}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-gray-400">
                    <Eye size={14} />
                    {post.views ?? 0} {t('posts.views')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {t('usersList.showing', {
                  from: ((currentPage - 1) * postsPerPage) + 1,
                  to: Math.min(currentPage * postsPerPage, filteredPosts.length),
                  total: filteredPosts.length
                })}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {t('usersList.previous')}
                </button>
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                        currentPage === page
                          ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                          : 'text-gray-600 bg-white border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {t('usersList.next')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;