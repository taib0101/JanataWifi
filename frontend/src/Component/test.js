import React from 'react';
import { List, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';

const VirtualizedListExample = ({ items }) => {
  const rowRenderer = ({ index, key, style }) => {
    const item = items[index];
    return (
      <div key={key} style={style} className="row">
        {item}
      </div>
    );
  };

  return (
    <div style={{ height: '400px', width: '300px' }}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={items.length}
            rowHeight={30}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
      <style jsx>{`
        .row {
          border-bottom: 1px solid #eee;
          padding: 8px;
        }
      `}</style>
    </div>
  );
};

const ExampleComponent = () => {
  const items = Array.from({ length: 1000 }, (_, index) => `Item ${index}`);

  return <VirtualizedListExample items={items} />;
};

export default ExampleComponent;