#pragma checksum "C:\Users\pca11\Desktop\Helperland\Helperland\Views\Serviceprovider\SPUpcomingservice.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "70aee40e18f20dda746dc9d4f36fbcf757134e67"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Serviceprovider_SPUpcomingservice), @"mvc.1.0.view", @"/Views/Serviceprovider/SPUpcomingservice.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\pca11\Desktop\Helperland\Helperland\Views\_ViewImports.cshtml"
using Helperland;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\pca11\Desktop\Helperland\Helperland\Views\_ViewImports.cshtml"
using Helperland.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"70aee40e18f20dda746dc9d4f36fbcf757134e67", @"/Views/Serviceprovider/SPUpcomingservice.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b5f94cf04a7ec23f27ac33992ef127038e0b3154", @"/Views/_ViewImports.cshtml")]
    public class Views_Serviceprovider_SPUpcomingservice : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/IMAGES/up-down-sort.png"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/IMAGES/calendar2.png"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/IMAGES/time.png"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/IMAGES/home.png"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("method", "post", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 2 "C:\Users\pca11\Desktop\Helperland\Helperland\Views\Serviceprovider\SPUpcomingservice.cshtml"
  
    ViewData["Title"] = "SPUpcomingservice";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"<!--row  table code start-->
<div class=""container-fluid row d-none"" id=""rightsidebar"">
    <div class=""col"">
        <table id=""upcoming-service-table"" class=""table table-hover"">
            <thead>
                <tr>
                    <th>
                        Service ID ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("img", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagOnly, "70aee40e18f20dda746dc9d4f36fbcf757134e675737", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n                    </th>\r\n                    <th>\r\n                        Service date ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("img", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagOnly, "70aee40e18f20dda746dc9d4f36fbcf757134e676862", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n                    </th>\r\n                    <th>\r\n                        Customer details ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("img", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagOnly, "70aee40e18f20dda746dc9d4f36fbcf757134e677991", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n                    </th>\r\n                    <th>Payment</th>\r\n                    <th>\r\n                        Distance ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("img", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagOnly, "70aee40e18f20dda746dc9d4f36fbcf757134e679152", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <!--1st row start-->
                <tr>
                    <td>
                        323436
                    </td>
                    <td>
                        <p class=""date"">
                            ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("img", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagOnly, "70aee40e18f20dda746dc9d4f36fbcf757134e6710556", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(" 09/04/2018\r\n                        </p>\r\n                        <p>\r\n                            ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("img", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagOnly, "70aee40e18f20dda746dc9d4f36fbcf757134e6711690", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@" 12:00 - 18:00
                        </p>
                    </td>
                    <td>
                        <p>
                            David Bough
                        </p>
                        <p>
                            ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("img", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagOnly, "70aee40e18f20dda746dc9d4f36fbcf757134e6712975", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@" Musterstrabe 5,12345 Bonn
                        </p>
                    </td>
                    <td>
                        &euro; 50
                    </td>
                    <td>
                        15 km
                    </td>
                    <td>
                        <input class=""cancel-btn"" type=""button"" value=""Cancel "" data-target=""#cancel-modal"" data-toggle=""modal"">
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</div>
<!--row  table code end-->
<!-- row details modal code start-->
<input class=""row-detail-hidden-input d-none"" data-target=""#upcoming-service-request-row-detail-modal"" data-toggle=""modal"" type=""button"" id=""upcoming-service-request-row-detail-modal-open-button"">
<div class=""modal fade"" id=""upcoming-service-request-row-detail-modal"" tabindex=""-1"" role=""dialog"" aria-labelledby=""exampleModal2Label"" aria-hidden=""true"">
    <div class=""modal-dialog modal-dialog-centered"" role=""document"">
        ");
            WriteLiteral(@"<div class=""modal-content"">
            <div class=""modal-header"" style=""margin-top:16px;"">
                <h5 class=""modal-title service-detail-body "" id=""exampleModal2Label"">Service Details</h5>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-label=""Close"">
                    <span aria-hidden=""true"">&times;</span>
                </button>
            </div>
            <div class=""modal-body"">
                <div class="" d-flex service-detail-leftside"" style=""width:100%"">
                    <div style=""width:50%"">
                        <p class=""date-time-duration"" id=""upcomingserviceRequestDateTime"">05/10/2021 8:00-11:30</p>
                        <p><b>Duration:</b><span id=""upcomingserviceRequestDuration""> 3.5 Hrs</span></p>
                        <hr />
                        <p><b>Service Id:</b><span id=""upcomingServiceRequestId"">8425</span></p>
                        <p id=""serviceExtra""><b>Extras:</b> Inside cabinets</p>
                      ");
            WriteLiteral(@"  <p id=""serviceExtra1"" class=""d-none""><b>Extras:</b> Inside cabinets</p>
                        <p id=""serviceExtra2"" class=""d-none""><b>Extras:</b> Inside fridge</p>
                        <p id=""serviceExtra3"" class=""d-none""><b>Extras:</b> Inside oven</p>
                        <p id=""serviceExtra4"" class=""d-none""><b>Extras:</b> Laundry Wash & Dry</p>
                        <p id=""serviceExtra5"" class=""d-none""><b>Extras:</b> interior Windows</p>
                        <p><b>Total Payment:</b> <span class=""total-payment"" id=""upcoming-total-payment"">87,50 &euro;</span></p>
                        <hr />
                        <p><b>Customer Name:</b><span id=""upcomingserviceRequestname"">Gaurang patel</span> </p>
                        <p><b>Service Address:</b><span id=""upcomingserviceRequestAddress"">Monghibai Road Vile Parle</span> </p>

                        <p><b>Distance: </b><span id=""upcomingServiceRequestPhone"">45km</span></p>

                        <hr />
                      ");
            WriteLiteral(@"  <p><b>Comments</b></p>
                        <p>
                            I don't have pets at home
                        </p>
                        <hr />
                        <div id=""upcoming-service-request-modal-btns-div"">
                            <button class=""btn upcoming-cancel-btn"" data-dismiss=""modal"" type=""button""   id=""service-detail-modal-cancel-btn""><span class=""glyphicon glyphicon-remove""></span>Cancel</button>
                            <button class=""btn upcoming-complete-btn"" data-dismiss=""modal"" type=""button"" id=""service-detail-modal-complete-btn"" ><span class=""glyphicon glyphicon-ok""></span>Complete</button>
                        </div>
                    </div>
                    <div style=""width:50%"">
                        <iframe width=""233"" height=""400"" frameborder=""0"" scrolling=""no"" marginheight=""0"" marginwidth=""0""
                                src=""https://www.openstreetmap.org/export/embed.html?bbox=72.48727798461915%2C23.032188951217627%2C72.");
            WriteLiteral(@"52744674682619%2C23.05979267762741&amp;layer=mapnik""></iframe>
                        <br />
                        <small><a href=""https://www.openstreetmap.org/#map=15/23.0460/72.5074"">View Larger Map</a></small>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
<!-- row details modal code end-->
<!--cancel modal code start-->
<input class=""cancel-hidden-input d-none"" data-target=""#cancel-modal"" data-toggle=""modal"" type=""button"" id=""cancel-modal-open-button"">
<div class=""modal fade"" id=""cancel-modal"" tabindex=""-1"" role=""dialog"" aria-labelledby=""exampleModal2Label"" aria-hidden=""true"">
    <div class=""modal-dialog modal-dialog-centered"" role=""document"">
        <div class=""modal-content"">
            <div class=""modal-header"">
                <h5 class=""modal-title accept-service-request"" id=""exampleModal2Label"">Cancel Service Request</h5>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-label=""Close"">
     ");
            WriteLiteral("               <span aria-hidden=\"true\">&times;</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "70aee40e18f20dda746dc9d4f36fbcf757134e6719638", async() => {
                WriteLiteral(@"
                    <div class=""form-group "">
                        <input type=""hidden"" id=""cancelId"" name=""cancelID"" />
                        <p class=""accept-heading"">Why you want to cancel the service request?</p>
                        <textarea class=""modal-textarea"" id=""cancel-modal-textarea"" style=""color:#646464;"" required></textarea>
                    </div>
                    <button class=""cancel-btn rounded-pill m-auto d-flex align-items-center justify-content-center"" style=""width:100%"" id=""cancel-modal-btn"" type=""button"" data-dismiss=""modal"">
                        Cancel
                    </button>
                ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper.Method = (string)__tagHelperAttribute_4.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_4);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
            </div>
        </div>
    </div>
</div>
<!--cancel modal code end-->
<!--complete modal code start-->
<input class=""complete-hidden-input d-none"" data-target=""#complete-modal"" data-toggle=""modal"" type=""button"" id=""complete-modal-open-button"">
<div class=""modal fade"" id=""complete-modal"" tabindex=""-1"" role=""dialog"" aria-labelledby=""exampleModal2Label"" aria-hidden=""true"">
    <div class=""modal-dialog modal-dialog-centered"" role=""document"">
        <div class=""modal-content"">
            <div class=""modal-header"">
                <h5 class=""modal-title accept-service-request"" id=""exampleModal2Label"">Complete Service Request</h5>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-label=""Close"">
                    <span aria-hidden=""true"">&times;</span>
                </button>
            </div>
            <div class=""modal-body"">
                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "70aee40e18f20dda746dc9d4f36fbcf757134e6722708", async() => {
                WriteLiteral(@"
                    <div class=""form-group "">
                        <input type=""hidden"" id=""completeId"" name=""completeID"" />
                        <p class=""accept-heading"">Have you Complete the Service Request?</p>
                        <textarea class=""modal-textarea"" id=""complete-modal-textarea"" style=""color:#646464;"" value=""Completed""></textarea>
                    </div>
                    <button class=""upcoming-complete-btn rounded-pill m-auto d-flex align-items-center justify-content-center"" id=""complete-modal-btn"" type=""button"" data-dismiss=""modal"" style=""width:100%;"">
                        Complete
                    </button>
                ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper.Method = (string)__tagHelperAttribute_4.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_4);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!--complete modal code end-->\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
