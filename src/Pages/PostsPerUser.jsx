import React, { useState } from 'react';
import { useFetch } from '../Hooks/useFetch';
import LoadingSpinner from '../Components/Common/LoadingSpinner';
import ErrorMessage from '../Components/Common/ErrorMessage';
import { Layout, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, Eye, Tag, Search } from 'lucide-react';

const PostsPerUser = () => {
  const { data: usersData, loading: usersLoading, error: usersError } = useFetch('https://dummyjson.com/users?limit=100');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [expandedPost, setExpandedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: postsData, loading: postsLoading, error: postsError } = useFetch(
    selectedUserId ? `https://dummyjson.com/posts/user/${selectedUserId}` : null
  );

  const filteredPosts = postsData?.posts?.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  ) ?? [];

  const selectedUser = usersData?.users?.find(u => u.id === parseInt(selectedUserId));

  if (usersLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <ErrorMessage message={usersError} onRetry={() => window.location.reload()} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-3xl shadow-xl border border-white/50 mb-4">
            <Layout className="w-10 h-10 text-purple-600" />
            <div className="text-left">
              <h1 className="text-4xl font-black bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Posts Per User
              </h1>
              <p className="text-gray-500 font-medium">Select a user to view their posts</p>
            </div>
          </div>
        </div>

        {/* User Selector */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <label className="block text-sm font-bold text-gray-700 mb-3">Select a User</label>
          <select
            value={selectedUserId}
            onChange={(e) => { setSelectedUserId(e.target.value); setExpandedPost(null); setSearchTerm(''); }}
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all text-gray-800 font-medium"
          >
            <option value="">— Choose a user —</option>
            {usersData?.users?.map(user => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName} (@{user.username})
              </option>
            ))}
          </select>
        </div>

        {/* Selected User Card */}
        {selectedUser && (
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 mb-8 flex items-center gap-5">
            <img
              src={selectedUser.image || `https://i.pravatar.cc/80?u=${selectedUser.id}`}
              alt={selectedUser.firstName}
              className="w-16 h-16 rounded-2xl ring-2 ring-purple-200 object-cover"
            />
            <div>
              <h2 className="text-xl font-black text-gray-900">
                {selectedUser.firstName} {selectedUser.lastName}
              </h2>
              <p className="text-gray-500 text-sm">@{selectedUser.username} · {selectedUser.email}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-3xl font-black text-purple-600">{postsData?.posts?.length ?? '—'}</p>
              <p className="text-sm text-gray-500 font-medium">Posts</p>
            </div>
          </div>
        )}

        {/* Posts Section */}
        {selectedUserId && (
          <>
            {postsLoading ? (
              <div className="py-12"><LoadingSpinner /></div>
            ) : postsError ? (
              <ErrorMessage message={postsError} />
            ) : (
              <>
                {/* Search within user posts */}
                {filteredPosts.length > 0 || searchTerm ? (
                  <div className="mb-6 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search this user's posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all shadow-sm"
                    />
                  </div>
                ) : null}

                {filteredPosts.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100">
                    <Layout className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-gray-700 mb-1">
                      {searchTerm ? 'No matching posts' : 'No posts found for this user'}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {searchTerm ? 'Try a different search term' : 'This user has not written any posts yet'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredPosts.map((post) => (
                      <div
                        key={post.id}
                        className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                      >
                        {/* Post Header — always visible */}
                        <button
                          className="w-full text-left p-6 flex items-start justify-between gap-4"
                          onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                        >
                          <div className="flex-1">
                            <div className="flex flex-wrap gap-2 mb-2">
                              {post.tags?.map(tag => (
                                <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-700 text-xs font-semibold rounded-lg">
                                  <Tag size={9} />{tag}
                                </span>
                              ))}
                            </div>
                            <h3 className="text-base font-bold text-gray-900 capitalize leading-snug">
                              {post.title}
                            </h3>
                          </div>
                          <div className="shrink-0 mt-1 text-gray-400">
                            {expandedPost === post.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </div>
                        </button>

                        {/* Expanded Content */}
                        {expandedPost === post.id && (
                          <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">{post.body}</p>
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                              <span className="flex items-center gap-1.5">
                                <ThumbsUp size={15} className="text-emerald-500" />
                                <span className="font-semibold text-gray-700">{post.reactions?.likes ?? 0}</span> likes
                              </span>
                              <span className="flex items-center gap-1.5">
                                <ThumbsDown size={15} className="text-rose-500" />
                                <span className="font-semibold text-gray-700">{post.reactions?.dislikes ?? 0}</span> dislikes
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Eye size={15} className="text-indigo-400" />
                                <span className="font-semibold text-gray-700">{post.views ?? 0}</span> views
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Empty state — no user selected */}
        {!selectedUserId && (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <Layout className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">No user selected</h3>
            <p className="text-gray-400">Pick a user from the dropdown above to see their posts</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default PostsPerUser;