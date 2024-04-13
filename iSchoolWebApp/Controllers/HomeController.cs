using iSchoolWebApp.Models;
using iSchoolWebApp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace iSchoolWebApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> About()
        {
            /*
             * Go get the data...
             * put the data in the model
             * send the resukt to the view
             */
            DataRetrieval dr = new DataRetrieval();
            var loadedAbout = await dr.GetData("about/");



            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
