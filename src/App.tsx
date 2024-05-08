import Editor from '@monaco-editor/react';
import { useRef } from 'react';
import * as Y from "yjs";
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';

function App() {

  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
    // Initialise YJS
    const doc = new Y.Doc();
    // Connect to peers or start connection with WebRTC
    const provider = new WebrtcProvider("test-room", doc);
    const type = doc.getText("monaco");
    // Bind YJS to Monaco
    const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);
  }

  return (
    // Setup Monaco Editor
    <Editor
      height="100vh"
      width="100vw"
      theme='vs-dark'
      onMount={handleEditorDidMount}
    />
  );
}

export default App;
