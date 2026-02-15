type StartButtonProps = {
  onStart: () => void
  content: 'Start' | 'Stop'
}

export default function StartButton({ onStart, content }: StartButtonProps) {
  return (
    <button onClick={onStart} id="startButton">{content}</button>
  )
}