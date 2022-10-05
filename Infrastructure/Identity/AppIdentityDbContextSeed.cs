using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Ilya Petrov",
                    Email = "dnamix1@gmail.com",
                    UserName = "dnamix1@gmail.com",
                    Address = new Address
                    {
                        FirstName = "Ilya",
                        LastName = "Petrov",
                        State = "Moscow Region",
                        City = "Luberci",
                        Street = "Pobratimov, 17-95",
                        ZipCode = "140013"
                    }
                };
                await userManager.CreateAsync(user, "superSecret101@#$");
            }
        }
    }
}
