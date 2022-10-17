import "./mobile-menu.js";
import "./slider.js";
import { BLOG_POINTS, changeActiveBtn, paginator } from "./paginator.js";


BLOG_POINTS.addEventListener("click", paginator);
BLOG_POINTS.addEventListener("click", changeActiveBtn);

document.addEventListener("DOMContentLoaded", paginator);
