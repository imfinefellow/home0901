import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  PlusCircle, 
  Heart, 
  MessageCircle, 
  MapPin, 
  Tag, 
  Search, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  X, 
  Send, 
  ThumbsUp, 
  AlertCircle,
  Bookmark,
  Filter,
  UserCheck
} from 'lucide-react';
import { CommunityCategory, CommunityPost } from '../types';
import { INITIAL_POSTS } from '../data/mockData';
import { useAccessibility } from '../context/AccessibilityContext';

export const CommunitySection: React.FC = () => {
  const { speak, settings } = useAccessibility();

  // Load posts from localStorage or mockData
  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    try {
      const saved = localStorage.getItem('renaissance_community_posts');
      return saved ? JSON.parse(saved) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  const [activeCategory, setActiveCategory] = useState<CommunityCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New post form state
  const [newPostCategory, setNewPostCategory] = useState<CommunityCategory>('cheonan_map');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostAuthor, setNewPostAuthor] = useState('');
  const [newPostRole, setNewPostRole] = useState('천안시민');
  const [newPostLocation, setNewPostLocation] = useState('');
  const [newPostTags, setNewPostTags] = useState('');

  // Comment input state for detail modal
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentContent, setCommentContent] = useState('');

  // Bookmarked posts
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('renaissance_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User liked post IDs
  const [likedPostIds, setLikedPostIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('renaissance_liked_posts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('renaissance_community_posts', JSON.stringify(posts));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem('renaissance_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('renaissance_liked_posts', JSON.stringify(likedPostIds));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [likedPostIds]);

  const categories: { id: CommunityCategory; label: string; icon: string }[] = [
    { id: 'all', label: '전체 글보기', icon: '🌟' },
    { id: 'cheonan_map', label: '천안 배리어프리 제보', icon: '🗺️' },
    { id: 'story', label: '일상 & 응원 이야기', icon: '💬' },
    { id: 'qna', label: '복지·보조기술 Q&A', icon: '❓' },
    { id: 'sharing', label: '나눔 & 자원봉사', icon: '🤝' },
    { id: 'policy', label: '정책 & 아이디어 제안', icon: '💡' },
  ];

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.locationTag && post.locationTag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  // Handle Like
  const handleToggleLike = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isLiked = likedPostIds.includes(postId);
    const updatedLiked = isLiked
      ? likedPostIds.filter((id) => id !== postId)
      : [...likedPostIds, postId];

    setLikedPostIds(updatedLiked);

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, likes: isLiked ? Math.max(0, p.likes - 1) : p.likes + 1 }
          : p
      )
    );

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) =>
        prev
          ? {
              ...prev,
              likes: isLiked ? Math.max(0, prev.likes - 1) : prev.likes + 1,
            }
          : null
      );
    }
  };

  // Handle Bookmark
  const handleToggleBookmark = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isBookmarked = bookmarkedIds.includes(postId);
    setBookmarkedIds(
      isBookmarked
        ? bookmarkedIds.filter((id) => id !== postId)
        : [...bookmarkedIds, postId]
    );
  };

  // Handle New Post Submit
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const parsedTags = newPostTags
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const createdPost: CommunityPost = {
      id: `post-${Date.now()}`,
      category: newPostCategory,
      title: newPostTitle.trim(),
      content: newPostContent.trim(),
      author: newPostAuthor.trim() || '익명의 천안시민',
      authorRole: newPostRole,
      locationTag: newPostLocation.trim() || '충청남도 천안시',
      tags: parsedTags.length > 0 ? parsedTags : ['천안', '배리어프리'],
      likes: 1,
      commentsCount: 0,
      comments: [],
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      isVerifiedPlace: newPostCategory === 'cheonan_map',
    };

    setPosts([createdPost, ...posts]);
    setIsCreateModalOpen(false);

    // Reset Form
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostAuthor('');
    setNewPostLocation('');
    setNewPostTags('');

    if (settings.textToSpeech) {
      speak('새로운 커뮤니티 게시글이 등록되었습니다.');
    }
  };

  // Handle Comment Submit
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !commentContent.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: commentAuthor.trim() || '천안 이웃',
      authorBadge: '시민 참여자',
      content: commentContent.trim(),
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      likes: 0,
    };

    const updatedPost = {
      ...selectedPost,
      commentsCount: selectedPost.commentsCount + 1,
      comments: [...selectedPost.comments, newComment],
    };

    setSelectedPost(updatedPost);
    setPosts((prev) =>
      prev.map((p) => (p.id === selectedPost.id ? updatedPost : p))
    );

    setCommentContent('');
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F8FAFC] text-slate-950 border-b border-slate-200" id="community-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-extrabold border border-blue-300 mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-blue-700" />
              <span>열린 참여 커뮤니티</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              차별 없는 세상을 함께 만드는 <br className="sm:hidden" />
              <span className="text-blue-600">시민 소통 광장</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-800 font-semibold mt-2 max-w-2xl leading-relaxed">
              천안시 관내 배리어프리 장소 제보, 일상의 따뜻한 이야기, 복지·보조공학 질문, 
              나눔과 봉사 소식을 자유롭게 나누는 공간입니다.
            </p>
          </div>

          {/* New Post Button */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-600/25 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-5 h-5" />
              <span>새로운 이야기 & 제보 쓰기</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-300 shadow-xs mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="제목, 내용, 천안 지역명(신부동, 불당동, 천안역), 태그로 검색해보세요..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-slate-50 border border-slate-300 text-slate-950 font-medium text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-950 text-xs font-bold cursor-pointer"
              >
                지우기
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (settings.textToSpeech) {
                      speak(`${cat.label} 카테고리를 선택했습니다.`);
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">검색된 게시글이 없습니다</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              다른 검색어를 입력하시거나 첫 번째 소중한 글을 직접 작성해보세요!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => {
              const isLiked = likedPostIds.includes(post.id);
              const isBookmarked = bookmarkedIds.includes(post.id);

              return (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-3.5">
                    {/* Top Row: Category & Location */}
                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-3 py-1 rounded-full font-bold ${
                        post.category === 'cheonan_map'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : post.category === 'story'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : post.category === 'qna'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : post.category === 'sharing'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {categories.find((c) => c.id === post.category)?.label || '커뮤니티'}
                      </span>

                      {post.locationTag && (
                        <span className="flex items-center gap-1 text-slate-500 text-[11px] truncate max-w-[140px]">
                          <MapPin className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                          <span className="truncate">{post.locationTag}</span>
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-[#3B82F6] transition line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    {/* Content Preview */}
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {post.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.map((tag, i) => (
                        <span key={i} className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row: Author & Reaction Stats */}
                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-[#3B82F6] font-bold flex items-center justify-center text-xs">
                        {post.author[0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-xs">{post.author}</div>
                        <div className="text-[10px] text-slate-400">{post.authorRole}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => handleToggleLike(post.id, e)}
                        className={`flex items-center gap-1 transition ${
                          isLiked ? 'text-rose-500 font-bold' : 'text-slate-400 hover:text-rose-500'
                        }`}
                        title="공감하기"
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                        <span>{post.likes}</span>
                      </button>

                      <div className="flex items-center gap-1 text-slate-400">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.commentsCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Post Detail Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#3B82F6] border border-blue-200">
                    {categories.find((c) => c.id === selectedPost.category)?.label || '커뮤니티'}
                  </span>
                  {selectedPost.locationTag && (
                    <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#3B82F6]" />
                      {selectedPost.locationTag}
                    </span>
                  )}
                  <span className="text-xs text-slate-400">작성일: {selectedPost.createdAt}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {selectedPost.title}
                </h3>

                {/* Author row */}
                <div className="flex items-center justify-between pt-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#3B82F6] text-white font-bold flex items-center justify-center text-sm">
                      {selectedPost.author[0]}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900">{selectedPost.author}</div>
                      <div className="text-xs text-slate-500">{selectedPost.authorRole}</div>
                    </div>
                  </div>

                  {/* Audio Readout */}
                  <button
                    type="button"
                    onClick={() => speak(`${selectedPost.title}. ${selectedPost.content}`)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-[#3B82F6] text-xs font-bold border border-blue-200 transition cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4 text-[#3B82F6]" />
                    <span>본문 음성 낭독</span>
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
                {selectedPost.content}
              </div>

              {/* Accessibility Features if available */}
              {selectedPost.accessibilityFeatures && selectedPost.accessibilityFeatures.length > 0 && (
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
                  <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
                    <span>확인된 배리어프리 편의시설</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.accessibilityFeatures.map((feat, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-white text-blue-900 text-xs font-medium border border-blue-200">
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map((t, i) => (
                  <span key={i} className="text-xs text-[#3B82F6] bg-blue-50 px-3 py-1 rounded-full font-medium border border-blue-100">
                    #{t}
                  </span>
                ))}
              </div>

              {/* Reactions Bar */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleLike(selectedPost.id)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-bold text-xs transition cursor-pointer ${
                      likedPostIds.includes(selectedPost.id)
                        ? 'bg-rose-100 text-rose-600'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedPostIds.includes(selectedPost.id) ? 'fill-rose-600' : ''}`} />
                    <span>공감 {selectedPost.likes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleBookmark(selectedPost.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                      bookmarkedIds.includes(selectedPost.id)
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarkedIds.includes(selectedPost.id) ? 'fill-amber-600' : ''}`} />
                    <span>저장</span>
                  </button>
                </div>

                <span className="text-xs text-slate-500">댓글 {selectedPost.commentsCount}개</span>
              </div>

              {/* Comments List */}
              <div className="space-y-4 border-t border-slate-100 pt-4">
                <h4 className="font-bold text-slate-900 text-sm">시민 참여 댓글 ({selectedPost.comments.length})</h4>

                {selectedPost.comments.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2">아직 작성된 댓글이 없습니다. 첫 따뜻한 댓글을 남겨보세요!</p>
                ) : (
                  <div className="space-y-3">
                    {selectedPost.comments.map((comment) => (
                      <div key={comment.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{comment.author}</span>
                            {comment.authorBadge && (
                              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#3B82F6] text-[10px] font-bold">
                                {comment.authorBadge}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400">{comment.createdAt}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                          {comment.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment Form */}
                <form onSubmit={handleAddComment} className="pt-2 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      placeholder="닉네임 (예: 천안이웃)"
                      className="px-3.5 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-[#3B82F6] outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      placeholder="따뜻한 응원이나 유용한 정보를 남겨주세요..."
                      className="flex-1 px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#3B82F6] outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!commentContent.trim()}
                      className="px-5 py-2.5 rounded-full bg-[#3B82F6] hover:bg-blue-600 disabled:bg-slate-200 text-white font-bold text-xs sm:text-sm transition flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>등록</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Create New Post Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 relative animate-in fade-in zoom-in-95 duration-200">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3B82F6]">
                  <PlusCircle className="w-4 h-4" />
                  <span>새로운 글 작성</span>
                </div>
                <h3 className="text-xl font-black text-slate-900">시민 커뮤니티 이야기 나누기</h3>
                <p className="text-xs text-slate-500">천안시 배리어프리 편의시설 제보나 일상의 경험을 공유해주세요.</p>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4">
                {/* Category Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">분류 선택</label>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value as CommunityCategory)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#3B82F6] outline-none"
                  >
                    <option value="cheonan_map">🗺️ 천안 배리어프리 장소 제보</option>
                    <option value="story">💬 일상 & 응원 이야기</option>
                    <option value="qna">❓ 복지·보조기술 질문</option>
                    <option value="sharing">🤝 나눔 & 자원봉사 모집</option>
                    <option value="policy">💡 정책 & 아이디어 제안</option>
                  </select>
                </div>

                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">제목</label>
                  <input
                    type="text"
                    required
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="예: 천안 신부동 터미널 앞 휠체어 램프 점검 후기"
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#3B82F6] outline-none"
                  />
                </div>

                {/* Author Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">작성자 닉네임</label>
                    <input
                      type="text"
                      value={newPostAuthor}
                      onChange={(e) => setNewPostAuthor(e.target.value)}
                      placeholder="예: 김천안"
                      className="w-full px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-[#3B82F6] outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">작성자 구분</label>
                    <select
                      value={newPostRole}
                      onChange={(e) => setNewPostRole(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-[#3B82F6] outline-none"
                    >
                      <option value="천안시민">천안시민</option>
                      <option value="휠체어 사용자">휠체어 사용자</option>
                      <option value="시니어 활동가">시니어 활동가</option>
                      <option value="시각/청각장애인">시각/청각장애인</option>
                      <option value="사회복지사">사회복지사</option>
                      <option value="자원봉사자">자원봉사자</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">천안시 상세 위치 (선택)</label>
                  <input
                    type="text"
                    value={newPostLocation}
                    onChange={(e) => setNewPostLocation(e.target.value)}
                    placeholder="예: 천안시 동남구 신부동 문화의거리 일대"
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-[#3B82F6] outline-none"
                  />
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">내용</label>
                  <textarea
                    required
                    rows={5}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="경사로 상태, 턱 높이, 편의시설 만족도나 경험을 자유롭게 적어주세요..."
                    className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#3B82F6] outline-none leading-relaxed"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">태그 (쉼표로 구분)</label>
                  <input
                    type="text"
                    value={newPostTags}
                    onChange={(e) => setNewPostTags(e.target.value)}
                    placeholder="천안역, 경사로, 휠체어, 배리어프리"
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-[#3B82F6] outline-none"
                  />
                </div>

                {/* Submit Actions */}
                <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-2.5 rounded-full bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
                  >
                    게시글 등록하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
