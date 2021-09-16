export default {
	state: {
		theme: {},
	},
	mutations: {
		set_theme(state, theme) {
			state.theme = theme
			localStorage.theme = theme
		},
	},
	actions: {
		init_theme({ commit }) {
			const cached = localStorage.theme ? localStorage.theme : false
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
			if (cached) {
				commit('set_theme', cached)
			} else if (prefersDark) {
				commit('set_theme', 'dark')
			} else {
				commit('set_theme', 'light')
			}
		},
		toggle_theme({ commit }) {
			switch (localStorage.theme) {
				case 'light':
					commit('set_theme', 'dark')
					break
				case 'dark':
					commit('set_theme', 'light')
					break
			}
		},
	},
	getters: {
		getTheme: (state) => {
			return state.theme
		},
	},
}
