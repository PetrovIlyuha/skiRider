using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductDto>()
                .ForMember(dest => dest.ProductType, origin => origin.MapFrom(field => field.ProductType.Name))
                .ForMember(dest => dest.ProductBrand, origin => origin.MapFrom(field => field.ProductBrand.Name))
                .ForMember(dest => dest.PictureUrl, origin => origin.MapFrom<ProductUrlResolver>());
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
        }
    }
}
