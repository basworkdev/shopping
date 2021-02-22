import React ,{useState} from "react";
import DataTable from 'react-data-table-component';
import faker from 'faker';

export default function AllProductsPage(props) {
    const [dataProductsState , setDataProductState] = useState([
        {
            id : "00001",
            name : "Thule x Tepui 1 เต็นท์หลังคารถ",
            price : 33000,
            fullPrice : 35000,
            productKey : "thule_x_tepui_1",
            type : "ROOF_TOP_TENT",
            brand  : "IRONMAN"
        },
        {
            id : "00002",
            name : "Thule x Tepui 2 เต็นท์หลังคารถ",
            price : 43000,
            fullPrice : 45000,
            productKey : "thule_x_tepui_2",
            type : "ROOF_TOP_TENT",
            brand  : "IRONMAN"
        }
    ])
      
      
      const FilterComponent = ({ filterText, onFilter, onClear }) => (
        <>
        <div className="row">
            <div className="col-10">
                <input id="search" className="form-control" type="text" placeholder="Filter By Name" aria-label="Search Input" value={filterText} onChange={onFilter} />
            </div>
            <div className="col-2">
                <button type="button" className="btn btn-outline-dark" onClick={onClear}>X</button>
            </div>
        </div>
        </>
      );
      
      const columns = [
        {
          name: 'รหัส',
          selector: 'id',
          sortable: true,
        },
        {
          name: 'ชื่อ',
          selector: 'name',
          sortable: true,
        },
        {
          name: 'ประเภท',
          selector: 'type',
          sortable: true,
        },
        {
            name: 'แบรนด์',
            selector: 'brand',
            sortable: true,
        },
        {
            name: 'ราคา',
            selector: 'price',
            sortable: true,
        },
        {
            name: 'ราคาเต็ม',
            selector: 'fullPrice',
            sortable: true,
        },
      ];
      
      const BasicTable = () => {
        const [filterText, setFilterText] = React.useState('');
        const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
        console.log(dataProductsState.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())))
        const filteredItems = dataProductsState.filter(item => 
            item.name && item.name.toLowerCase().includes(filterText.toLowerCase()) ||
            item.id && item.id.toLowerCase().includes(filterText.toLowerCase()) ||
            item.brand && item.brand.toLowerCase().includes(filterText.toLowerCase()) ||
            item.type && item.type.toLowerCase().includes(filterText.toLowerCase())
            );
      
        const subHeaderComponentMemo = React.useMemo(() => {
          const handleClear = () => {
            if (filterText) {
              setResetPaginationToggle(!resetPaginationToggle);
              setFilterText('');
            }
          };
      
          return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
        }, [filterText, resetPaginationToggle]);
      
        return (
          <DataTable
            // title="Contact List"
            columns={columns}
            data={filteredItems}
            pagination
            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            selectableRows
            persistTableHead
          />
        );
      };
    return(
        <>
            <div className="container admin-page">
                <h2>สินค้าทั้งหมด <span><button className="btn btn-primary">เพิ่มสินค้า</button></span></h2>
                <br/>
                
                <div>
                    <BasicTable/>
                </div>
            </div>
        </>
    )
}