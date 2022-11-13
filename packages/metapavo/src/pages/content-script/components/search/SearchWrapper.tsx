import { useContext } from 'react';

import { GlobalContext } from '../../context/useGlobal';
import Search from './search/Search';

export default function SearchWrapper() {
  const { showSearch, setShowSearch } = useContext(GlobalContext);
  return (
    <>
      {showSearch && (
        <>
          <div
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.5)',
              zIndex: 11998,
            }}
            onClick={() => {
              setShowSearch(false);
            }}
          ></div>
          <div
            style={{
              position: 'fixed',
              width: '700px',
              left: '50%',
              marginLeft: '-350px',
              top: '100px',
              zIndex: 11999,
            }}
          >
            <Search />
          </div>
        </>
      )}
    </>
  );
}
