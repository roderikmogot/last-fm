import { FiUsers, FiMusic, FiHome } from "react-icons/fi";

interface ButtonType {
  isHome?: boolean;
  isSearchSongs?: boolean;
  isSearchArtists?: boolean;
  bgColor: string;
}

const Button = ({
  isHome,
  isSearchSongs,
  isSearchArtists,
  bgColor,
}: ButtonType) => {
  let text = "Cari ";
  if (isHome) text = "Home";
  else if (isSearchArtists) text += "Artis";
  else text += "Lagu";

  return (
    <button className={`w-full flex flex-row items-center gap-2 px-4 py-2 ${bgColor} text-white text-xl`}>
      {isHome && <FiHome />}
      {isSearchSongs && <FiMusic />}
      {isSearchArtists && <FiUsers />}
      <div className="text-xs md:text-lg font-bold">{text}</div>
    </button>
  );
};

export default Button;
