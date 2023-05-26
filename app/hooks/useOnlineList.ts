import { create } from "zustand";

interface OnlineListStore {
  members: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (ids: string[]) => void;
}

const useOnlineList = create<OnlineListStore>((set) => (
  {
    members: [],
    add: (id) => set((state) => (
        {
          members: [...state.members, id]
        }
      )
    ),
    remove: (id) => set((state) => (
        {
          members: state.members.filter((memberId) => memberId !== id)
        }
      )
    ),
    set: (ids) => set({ members: ids })
  }
));

export default useOnlineList;