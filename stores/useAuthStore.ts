import { useAuthApi } from "../composables/useAuthApi"
import { defineStore } from 'pinia'

const { showAlert } = useHelpers();

export const useAuthStore = defineStore('useAuthStore', {
  state: () => ({
    estado: 'not-authenticated',
    usuario: null,
    videos: []
  }),
  persist: true,
  getters: { },
  actions: {
    async login(user: { email: string, password: string }, keyFirebase: string) {
      const { authApi } = useAuthApi( keyFirebase );
      const { email, password } = user;

      try {
        const { data } = await authApi.post(':signInWithPassword', { 
          email, 
          password, 
          returnSecureToken: true 
        })

        this.usuario = data;       
        this.estado = 'authenticated'

        showAlert('Se inicio sesión exitosamente', 'success')

        await new Promise(resolve => setTimeout(resolve, 1500));

        useRouter().push('/')

      } catch (error: any) {
        console.log(error);
        showAlert(error.response.data.error.message, 'error')
      }
    }
  }
});
