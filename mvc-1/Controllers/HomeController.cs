using Microsoft.AspNetCore.Mvc;
using mvc_1.Models;
using System.Diagnostics;

namespace mvc_1.Controllers
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

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult DanNoData()
        {
            return View();
        }

        public IActionResult DanWithModel()
        {
            var getDanWithModel = new DanWithModel();

            getDanWithModel.Title = "Some hard coded title";
            getDanWithModel.Description = "Lots and lots fo words that really matter";
            getDanWithModel.PageTitle = "title up top from the view";
            getDanWithModel.HowMany = 50;

            return View(getDanWithModel);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
