using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TestController : BaseAPIController
    {
        [HttpGet]
        public ActionResult<TestEntity> ReturnString()
        {
            var response = new TestEntity { Response = "Gello" };
            return response;
        }
    }
}