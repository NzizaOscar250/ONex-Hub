import React, { useState ,useEffect} from 'react';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const MyEditor =()=>{
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [contentState, setContentState] = useState(() => {
    const _contentState = ContentState.createFromText("write new lesson");
    return convertToRaw(_contentState);
  });

  useEffect(() => {
    // Update contentState when editorState changes
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    setContentState(rawContentState);
  }, [editorState]);

  
  return (
      <Editor 
        defaultContentState={contentState}
        editorClassName="editor-class"
       onEditorStateChange={setEditorState}
        onContentStateChange={setContentState}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
          },
          list: {
            options: ['unordered', 'ordered'],
          },
          textAlign: { options: ['left', 'center', 'right', 'justify'] },
          
        }}
      />

    )
}

export default MyEditor