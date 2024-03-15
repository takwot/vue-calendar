import create from 'vue-zustand'



const useDate = create((set) => ({
    current_year: 2024,
    current_month: 2
}))



export default useDate