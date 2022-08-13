interface ItemType {
  id: number;
  artistName?: string;
  trackName?: string;
  url: string;
  useRanking?: boolean;
}

const Item = ({ id, artistName, trackName, url, useRanking }: ItemType) => {
  let isTop3: boolean = id < 3;
  let hasArtistAndTrack: boolean = !artistName || !trackName;
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      key={id}
      className="rounded-md shadow p-4 flex items-center gap-10"
    >
      <div
        className={`ml-4 font-bold ${
          useRanking && isTop3 ? "text-4xl" : "text-lg"
        }`}
      >
        {id + 1}
      </div>
      <div className="leading-loose">
        {trackName && (
          <div
            className={`text-xl ${
              useRanking && isTop3 ? "md:text-3xl" : ""
            } font-bold`}
          >
            {trackName}
          </div>
        )}
        <div
          className={`${
            hasArtistAndTrack
              ? `${useRanking && isTop3 ? "text-4xl" : "text-xl"} font-bold text-black`
              : "text-xl text-gray-500"
          }`}
        >
          {artistName}
        </div>
      </div>
    </a>
  );
};

export default Item;
