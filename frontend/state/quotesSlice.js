// ✨ create your `quotesSlice` in this module
import { createSlice } from "@reduxjs/toolkit"

let id = 1
 export const getNextId = () => id++

const quotesSlice = createSlice({
  name:'quotes_state',
  initialState: {
    displayAllQuotes: true,
    highlightedQuote: 1,
    quotes: [
      {
        id: getNextId(),
        quoteText: "Don't cry because it's over, smile because it happened.",
        authorName: "Dr. Seuss",
        apocryphal: false,
      },
      {
        id: getNextId(),
        quoteText: "So many books, so little time.",
        authorName: "Frank Zappa",
        apocryphal: false,
      },
      {
        id: getNextId(),
        quoteText: "Be yourself; everyone else is already taken.",
        authorName: "Oscar Wilde",
        apocryphal: false,
      },
    ],
  },
  reducers:{
  toggleVisibility(state){
   state.displayAllQuotes =!state.displayAllQuotes
  },
  deleteQuote(state,action){
  const id = action.payload
  state.quotes = state.quotes.filter(qu => qu.id !== id)
  },
  editQuoteAuthenticity(state,action){
    const quoteToEdit = state.quotes.find(qt => qt.id === action.payload)
    quoteToEdit.apocryphal = !quoteToEdit.apocryphal 

  },
  setHighlightedQuote(state,action){
   if(state.highlightedQuote === action.payload){
    state.highlightedQuote = null
   }else {
    state.highlightedQuote = action.payload
   }
  },
  createQuote:{
    prepare({authorName,quoteText}){
      return{
        payload:{
          authorName,
          quoteText,
          apocryphal:false,
          id:getNextId()
        }
      }
     },
     reducer(state,action){
      state.quotes.push(action.payload)
    }
   }
  }
})


export default quotesSlice.reducer

export const {
  toggleVisibility,
  deleteQuote,
  editQuoteAuthenticity,
  setHighlightedQuote,
  createQuote,
} = quotesSlice.actions