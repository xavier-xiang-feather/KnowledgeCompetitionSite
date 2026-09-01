import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home, TestPage, ScorePage} from "./pages";
import {AddQuestionPage, QuestionBankPage, EditQuestionPage} from "./pages";
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TestPage" element={<TestPage />} />
        <Route path="/ScorePage" element={<ScorePage />} />
        <Route path="/AddQuestionPage" element={
          <ProtectedRoute>
            <AddQuestionPage />
          </ProtectedRoute>
        } />
        <Route path="/QuestionBankPage" element={
          <ProtectedRoute>
            <QuestionBankPage />
          </ProtectedRoute>
        } />
        <Route path="/EditQuestionPage" element={
          <ProtectedRoute>
            <EditQuestionPage />
          </ProtectedRoute>
        } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
