import React, { useEffect, useState } from 'react';
import Axios from '../utilis/Axios';
import SummaryApi from '../common/SummaryApi';
import { Link, useParams } from 'react-router-dom';
import AxiosToastError from '../utilis/AxiousToastError';
import Loading from '../component/Loading';
import CardProduct from '../component/CardProduct';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utilis/validURLConvert';

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const params = useParams();
  const AllSubcategory = useSelector(state => state.product.allSubcategory);
  const [DisplaySubcatory, setDisplaySubcategory] = useState([]);

  const subcategory = params?.subcategory?.split("-");
  const subcategoryName = subcategory?.slice(0, subcategory?.length - 1)?.join(" ");

  const categoryId = params.category.split("-").slice(-1)[0];
  const subcategoryId = params.subcategory.split("-").slice(-1)[0];

  const fetchProductdata = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subcategoryId,
          page: page,
          limit: 8,
        }
        
        
      });
      

      const { data: responseData } = response;

      if (responseData.success) {
        if (page === 1) {
          setData(responseData.data);
        } else {
          setData(prev => [...prev, ...responseData.data]);
        }
        setTotalPage(responseData.totalPages);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    setPage(1);
    setData([]); 
  }, [params]);

  useEffect(() => {
    if (page === 1) {
      setData([]); 
    }
    fetchProductdata();
  }, [page, params]);

  useEffect(() => {
    const sub = AllSubcategory.filter(s => {
      return s?.category?.some(el => el._id === categoryId);
    });
    setDisplaySubcategory(sub);
  }, [params, AllSubcategory]);

  return (
    <section className='sticky top-24 lg:top-20'>
      <div className='container mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]'>

        {/* Subcategory Navigation */}
        <div className='min-h-[88vh] max-h-[88vh] overflow-y-scroll grid gap-1 shadow-md scrollbarCustom bg-white py-2'>
          {DisplaySubcatory.map((s, index) => {
            const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`;
            return (
              <Link
                key={s._id + index}
                to={link}
                className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b 
                  hover:bg-green-100 cursor-pointer ${subcategoryId === s._id ? "bg-green-100" : ""}`}
              >
                <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded'>
                  <img
                    src={s.image}
                    alt='subCategory'
                    className='w-14 lg:h-14 lg:w-12 object-scale-down'
                  />
                </div>
                <p className='-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base'>{s.name}</p>
              </Link>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className='sticky top-20'>
          <div className='bg-white shadow-md p-4 z-10'>
            <h3 className='font-semibold'>{subcategoryName}</h3>
          </div>
          <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4'>
              {data.map((p, index) => (
                <CardProduct
                  data={p}
                  key={p._id + "productSubCategory" + index}
                />
              ))}
            </div>

            {/* Load More Button */}
            {page < totalPage && !loading && (
              <div className='text-center py-4'>
                <button
                  onClick={() => setPage(prev => prev + 1)}
                  className='px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition'
                >
                  Load More
                </button>
              </div>
            )}

            {/* Loading Spinner */}
            {loading && <Loading />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
