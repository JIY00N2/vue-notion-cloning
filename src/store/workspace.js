import router from '~/routes';

export default {
  namespaced: true,
  state() {
    return {
      workspaces: [],
      currentWorkspace: {},
      currentWorkspacePath: [],
    };
  },
  getters: {},
  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
  },
  actions: {
    async createWorkspace({ dispatch }, payload = {}) {
      const { parentId } = payload;
      const workspace = await _request({
        method: 'POST',
        body: JSON.stringify({
          title: '',
          parent: parentId,
        }),
      });
      await dispatch('readWorkspaces');
      router.push({
        name: 'Workspace',
        params: {
          id: workspace.id,
        },
      });
    },
    async readWorkspaces({ commit, dispatch }) {
      const workspaces = await _request({
        method: 'GET',
      });
      commit('assignState', {
        workspaces,
      });
      dispatch('findWorkspacePath');
      if (!workspaces.length) {
        await dispatch('createWorkspace');
      }
    },
    async readWorkspace({ commit }, payload) {
      const { id } = payload;
      try {
        const workspace = await _request({
          id,
          method: 'GET',
        });
        commit('assignState', {
          currentWorkspace: workspace,
        });
      } catch (error) {
        router.push('/error');
      }
    },
    async updateWorkspace({ dispatch }, payload) {
      const { id, title, content } = payload;
      await _request({
        id,
        method: 'PUT',
        body: JSON.stringify({ title, content }),
      });
      // 제목 바뀌는 즉시 수정
      dispatch('readWorkspaces');
    },
    async deleteWorkspace({ state, dispatch }, payload) {
      const { id } = payload;
      await _request({
        id,
        method: 'DELETE',
      });
      await dispatch('readWorkspaces');
      if (id === parseInt(router.currentRoute.value.params.id, 10)) {
        router.push({
          name: 'Workspace',
          params: {
            id: state.workspaces[0].id,
          },
        });
      }
    },
    findWorkspacePath({ state, commit }) {
      const currentWorkspaceId = parseInt(
        router.currentRoute.value.params.id,
        10
      );
      function _find(workspace, parents) {
        if (currentWorkspaceId === workspace.id) {
          commit('assignState', {
            currentWorkspacePath: [...parents, workspace],
          });
        }
        if (workspace.documents) {
          workspace.documents.forEach((ws) =>
            _find(ws, [...parents, workspace])
          );
        }
      }
      state.workspaces.forEach((workspace) => _find(workspace, []));
    },
  },
};

/* createWorkspace로 생성하면, 
readWorkspace 액션을 실행을 해주면
서버에서 데이터를 가져와서 목록을 갱신함 => dispatch('readWorkspace')
*/

async function _request(options) {
  return await fetch('/.netlify/functions/workspace', {
    method: 'POST',
    body: JSON.stringify(options),
  }).then((res) => res.json());
}

// id가 undefined가 될 수 있기 때문에 {id =''}
// _request : 현재 파일 내부에서만 request를 사용
