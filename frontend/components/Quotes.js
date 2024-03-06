import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {deleteQuote,toggleVisibility,editQuoteAuthenticity,setHighlightedQuote} from '../state/quotesSlice'

export default function Quotes() {
  const quotes = useSelector(st => st.state.quotes) // ✨ `quotes` must come from the Redux store
  const dispatch = useDispatch()
  const displayAllQuotes = useSelector(st => st.state.displayAllQuotes) // ✨ `displayAllQuotes` must come from the Redux store
  const highlightedQuote = useSelector(st => st.state.highlightedQuote) // ✨ `highlightedQuote` must come from the Redux store

  return (
    <div id="quotes">
      <h3>Quotes</h3>
      <div>
        {
          quotes
            ?.filter(qt => {
              return displayAllQuotes || !qt.apocryphal
            })
            .map(qt => (
              <div
                key={qt.id}
                className={`quote${qt.apocryphal ? " fake" : ''}${highlightedQuote === qt.id ? " highlight" : ''}`}
              >
                <div>{qt.quoteText}</div>
                <div>{qt.authorName}</div>
                <div className="quote-buttons">
                  <button onClick={() => {dispatch(deleteQuote(qt.id))}}>DELETE</button>
                  <button onClick={() => {dispatch(setHighlightedQuote(qt.id))}}>HIGHLIGHT</button>
                  <button onClick={() => {dispatch(editQuoteAuthenticity(qt.id)) }}>FAKE</button>
                </div>
              </div>
            ))
        }
        {
          !quotes?.length && "No quotes here! Go write some."
        }
      </div>
      {!!quotes?.length && <button onClick={() => {dispatch(toggleVisibility())}}>
        {displayAllQuotes ? 'HIDE' : 'SHOW'} FAKE QUOTES
      </button>}
    </div>
  )
}
