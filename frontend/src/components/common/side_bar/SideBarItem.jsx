import { Link } from 'react-router-dom';

function SideBarItem ({ name, router }) {

  return (
    <Link to={router}>
      <div className="h-8 my-2 w-28 relative flex justify-center items-center rounded hover:bg-rose-400">
        <p className="my-2 text-white text-white text-xl">{name}</p>
      </div>
    </Link>
  )
}

export default SideBarItem;