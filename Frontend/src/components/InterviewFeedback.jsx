import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Building,
  Star,
  Calendar,
  Target,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSelector } from "react-redux";

const InterviewFeedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allUserInterviews } = useSelector((store) => store.interview);
  const [openQuestions, setOpenQuestions] = useState({});

  // Mock data - in real app, you'd fetch this based on the ID
  const interviews = allUserInterviews;

  const interview = interviews.find((interview) => interview._id === id);

  // If interview not found, show error message
  if (!interview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-stone-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Interview Not Found
          </h2>
          <p className="text-slate-600 mb-6">
            The interview you're looking for doesn't exist.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const calculateOverallRating = (results) => {
    const totalRating = results.reduce((sum, result) => sum + result.rating, 0);
    return Math.round(totalRating / results.length);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "hard":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return "text-emerald-600";
    if (rating >= 6) return "text-amber-600";
    return "text-orange-600";
  };

  const getRatingBg = (rating) => {
    if (rating >= 8) return "bg-emerald-100 border-emerald-200";
    if (rating >= 6) return "bg-amber-100 border-amber-200";
    return "bg-orange-100 border-orange-200";
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const toggleQuestion = (index) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-stone-100">
      {/* Header */}

      {/* Main Content */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Interview Header */}
          <div className="mb-8">
            <Card className="bg-white border-slate-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h2 className="text-3xl font-bold text-slate-800">
                        {interview.jobTitle}
                      </h2>
                      <Badge
                        className={getDifficultyColor(interview.difficulty)}
                      >
                        {interview.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600 mb-4">
                      <Building className="h-5 w-5" />
                      <span className="text-lg">{interview.company}</span>
                    </div>
                    <p className="text-slate-600 mb-4">
                      {interview.jobDescription}
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(interview.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="h-4 w-4" />
                        <span>{interview.results.length} Questions</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{interview.experience} experience</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-3">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Star
                          className={`h-8 w-8 ${getRatingColor(
                            calculateOverallRating(interview.results)
                          )}`}
                        />
                        <span
                          className={`text-3xl font-bold ${getRatingColor(
                            calculateOverallRating(interview.results)
                          )}`}
                        >
                          {calculateOverallRating(interview.results)}/10
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm">Overall Rating</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-sm text-slate-600">
                    <span className="font-medium">Skills:</span>{" "}
                    {interview.skills}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question-wise Results */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800">
              Question-wise Performance
            </h3>
            <div className="space-y-4">
              {interview.results.map((result, index) => (
                <Card
                  key={index}
                  className="bg-white border-slate-200 hover:shadow-lg transition-all duration-300"
                >
                  <Collapsible
                    open={openQuestions[index] || false}
                    onOpenChange={() => toggleQuestion(index)}
                  >
                    <CollapsibleTrigger className="w-full">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-left">
                            <span className="text-sm font-medium text-slate-500 min-w-[80px]">
                              Question {index + 1}
                            </span>
                            <Badge
                              className={`${getRatingBg(
                                result.rating
                              )} ${getRatingColor(result.rating)} border`}
                            >
                              {result.rating}/10
                            </Badge>
                            <h4 className="text-lg font-semibold text-slate-800 flex-1">
                              {result.question}
                            </h4>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            {openQuestions[index] ? (
                              <ChevronUp className="h-5 w-5 text-slate-500" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-slate-500" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="px-6 pb-6 pt-0">
                        <div className="border-t border-slate-200 pt-4">
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium text-slate-700 mb-2">
                                Your Answer:
                              </p>
                              <p className="text-slate-600 bg-slate-50 p-3 rounded-lg">
                                {result.answer}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-700 mb-2">
                                Feedback:
                              </p>
                              <p className="text-slate-600">
                                {result.feedback}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <Button
              onClick={handleBackToDashboard}
              variant="outline"
              className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200"
            >
              Back to Dashboard
            </Button>
            <Button
              onClick={() => {
                navigate("/interview");
              }}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Start New Interview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewFeedback;
