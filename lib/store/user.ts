import { User } from '@supabase/supabase-js'
import { create } from 'zustand'

interface UserState {
  user: User|undefined
}

const useUser = create<UserState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))