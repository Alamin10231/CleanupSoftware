import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { persist } from "zustand/middleware"

const userAuthStore = create(
   persist(
      immer((set) => ({
         session: null,
         user: null,
         hydration: false,
         setHydrated: () => {
            set({ hydration : true })
         },
         login: async (email, password) => {
            try {
               set({ session: String(email), user: { email, password }})
               return { success: true }
            } catch (error) {
               return { success: false, error }
            }
         },
         createAccount: async (name, email, password) => {
            try {
               set({ session: String(email), user: { name, email, password }})
               return { success: true }
            } catch (error) {
               return { success: false, error: error.message }
            }
         },
         logout: () => {
            try {
               set({ session: null, user: null })
            } catch (error) {
               return { success: false, error: error.message }
            }
         }
      })),
      {
         name: "auth",
         onRehydrateStorage: () => {
            console.log("hydration starts");

            return (state, error) => {
               if (!error) return state.setHydrated()
            }
         }
      }
   )
)

export default userAuthStore;
