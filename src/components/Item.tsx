interface ItemType {
  id: number;
  artistName?: string;
  trackName?: string;
}

const Item = ({ id, artistName, trackName }: ItemType) => {
  let isTop3: boolean = id < 3;
  let hasArtistAndTrack: boolean = !artistName || !trackName
  return (
    <div key={id} className="rounded-md shadow p-4 flex items-center gap-10">
      <div className={`ml-4 font-bold ${isTop3 ? "text-4xl" : "text-lg"}`}>
        {id + 1}
      </div>
      <div className="leading-loose">
        {trackName && (
          <div className={`text-xl ${isTop3 ? "md:text-3xl" : ""} font-bold`}>
            {trackName}
          </div>
        )}
        <div className={`text-xl ${hasArtistAndTrack ? "font-bold text-black" : "text-gray-500"}`}>{artistName}</div>
      </div>
    </div>
  );
};

export default Item;
