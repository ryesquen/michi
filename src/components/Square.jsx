export const Square = ({ children, updateBoard, i }) => {
  return (
    <div className="square" onClick={() => updateBoard(i)}>
      {children}
    </div>
  )
}
