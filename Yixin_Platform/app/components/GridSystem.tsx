import './grid-system.css';

const GridSystem = ({className}: {className?: string}) => {
  return (
    <div className={`grid-system w-screen h-screen fixed top-0 left-0 ${className}`}>
      <div className="column"></div>
      <div className="column"></div>
      <div className="column"></div>
      <div className="column"></div>
      <div className="column max-md:hidden"></div>
      <div className="column max-md:hidden"></div>
      <div className="column max-md:hidden"></div>
      <div className="column max-md:hidden"></div>
      <div className="column max-md:hidden"></div>
      <div className="column max-md:hidden"></div>
      <div className="column max-md:hidden"></div>
      <div className="column max-md:hidden"></div>
      <div className="box absolute"></div>
    </div>
  )
}

export default GridSystem