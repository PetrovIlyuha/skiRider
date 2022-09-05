
using API.DTOs;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> productsRepository;
        private readonly IGenericRepository<ProductBrand> productBrandRepository;
        private readonly IGenericRepository<ProductType> productTypesRepository;
        private readonly IMapper mapper;

        public ProductsController(
            IGenericRepository<Product> productsRepository,
            IGenericRepository<ProductBrand> productBrandRepository,
            IGenericRepository<ProductType> productTypesRepository,
            IMapper mapper)
        {
            this.productsRepository = productsRepository;
            this.productBrandRepository = productBrandRepository;
            this.productTypesRepository = productTypesRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductDto>>> GetProducts()
        {
            var products = await productsRepository.ListAsync(new ProductWithTypesAndBrandsSpec());
            if (products == null)
            {
                return BadRequest("Products data not found...");
            }
            return Ok(mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductDto>>(products));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var product = await productsRepository.GetEntityWithSpec(new ProductWithTypesAndBrandsSpec(id));
            if (product == null) return NotFound(new ApiResponse(404, "Product was not found..."));
            var productDto = mapper.Map<Product, ProductDto>(product);
            return Ok(productDto);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await productBrandRepository.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await productTypesRepository.ListAllAsync());
        }
    }
}
