import { useState, useEffect } from 'react';
interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Origin;
    image: string;
    episode: string[];
    url: string;
    created: string;
  }
  
  interface Origin {
    name: string;
    url: string;
  }
  
  
function InfiniteScroll() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchcharacters = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
      const data = await response.json();
      console.log(data.results)
      setCharacters(prevcharacters => [...prevcharacters, ...data.results]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
    setLoading(false);
  };
  useEffect(() => {
    // Fetch characters when component mounts
    fetchcharacters();
  }, []); // Empty dependency array runs once on mount

  // Function to handle scrolling and load more characters
  const handleScroll = () => {
    if (loading) return;
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      fetchcharacters();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div>
      <div id="characters-list">
        {characters.map(product => (
          <div key={product.id} className="product-item">
            {product.name}
          </div>
        ))}
      </div>
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default InfiniteScroll;