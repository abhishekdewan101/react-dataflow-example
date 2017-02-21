describe('posts store', () => {
  let store;
  const post1 = { id: 'id1' };
  const post2 = { id: 'id2' };

  beforeEach(() => {
    store = require('./store');
  });

  it('initial is loading', () => {
    expect(store.getters.isLoading()).toBe(true);
  });

  it('holds posts by id', () => {
    expect(store.getters.getPostsById()).toEqual({});

    store.setters.setPosts([post1, post2]);
    expect(store.getters.getPostsById()).toEqual({ id1: post1, id2: post2 });
  });

  it('stops loading once setPosts called', () => {
    store.setters.setPosts([]);
    expect(store.getters.isLoading()).toBe(false);
  });

  it('returns posts id array', () => {
    store.setters.setPosts([post1, post2]);
    expect(store.getters.getPostsIdsArray()).toEqual(['id1', 'id2']);
  });

  it('holds selected postId, finds the post from current posts', () => {
    expect(store.getters.getSelectedPost()).toEqual(undefined);
    store.setters.selectPost('id1');
    expect(store.getters.getSelectedPost()).toEqual(undefined);
    store.setters.setPosts([post2]);
    expect(store.getters.getSelectedPost()).toEqual(undefined);
    store.setters.setPosts([post2, post1]);
    expect(store.getters.getSelectedPost()).toBe(post1);
  });

  it('is post selected', () => {
    expect(store.getters.isPostSelected('')).toBe(false);
    expect(store.getters.isPostSelected('thePostId')).toBe(false);
    store.setters.selectPost('thePostId');
    expect(store.getters.isPostSelected('thePostId')).toBe(true);
  });

  it('initial filter is all', () => {
    expect(store.getters.getCurrentFilter()).toEqual('all');
  });

  it('holds topics filter, default is all', () => {
    store.setters.setFilter('myFilter');
    expect(store.getters.getCurrentFilter()).toEqual('myFilter');
    store.setters.setFilter();
    expect(store.getters.getCurrentFilter()).toEqual('all');
  });
});
