import React ,{useState,useEffect} from "react";
import DataTable from 'react-data-table-component';
import ProductsApi from '../../../apis/ProductsApi'
import { useHistory } from "react-router-dom";


export default function AllProductsPage(props) {
  let history = useHistory();
  const [dataProductsState , setDataProductState] = useState([])

  useEffect(()=>{
    getProducts();
  },[])
    
  const getProducts = async () => {
    let products = await ProductsApi.doserviceGetAllProduct();
    let productsData = products.map((data,index)=>{
      return {
        id : data.id,
        name : data.name,
        price : data.price,
        fullPrice : data.fullPrice,
        productKey : data.productKey,
        type : data.typeName,
        brand  : data.brand,
        stock : data.stock,
        status : data.status,
        img : data.ing
      }
    })
    setDataProductState(productsData);
  }
    
  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
    <div className="row">
        <div className="col-10">
            <input id="search" className="form-control" type="text" placeholder="Search" aria-label="Search Input" value={filterText} onChange={onFilter} />
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
      name: 'ราคาหลัก',
      selector: 'fullPrice',
      sortable: true,
    },
    {
        name: 'สต็อก',
        selector: 'stock',
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
            <h2>สินค้าทั้งหมด <span><button className="btn btn-primary" onClick={()=>{history.push('/admin/create-product')}}>เพิ่มสินค้า</button></span></h2>
            <br/>
            
            <div>
                <BasicTable/>
            </div>
        </div>
    </>
  )
}