import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type OnChangeHandler = (str: string) => void;

interface HtmlEditorProps {
  value: string;
  onChange: OnChangeHandler;
}

export const HtmlEditor: React.FC<HtmlEditorProps> = ({ onChange, value }) => {
  return <ReactQuill onChange={onChange} value={value} />;
};
