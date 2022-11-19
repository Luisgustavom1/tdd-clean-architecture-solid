"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateclean_arquiteture_tdd"]("main",{

/***/ "./src/presentation/pages/login/index.tsx":
/*!************************************************!*\
  !*** ./src/presentation/pages/login/index.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router/esm/react-router.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _presentation_components_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/presentation/components/button */ \"./src/presentation/components/button/index.tsx\");\n/* harmony import */ var _presentation_components_footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/presentation/components/footer */ \"./src/presentation/components/footer/index.tsx\");\n/* harmony import */ var _presentation_components_header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/presentation/components/header */ \"./src/presentation/components/header/index.tsx\");\n/* harmony import */ var _presentation_components_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/presentation/components/input */ \"./src/presentation/components/input/index.tsx\");\n/* harmony import */ var _presentation_components_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/presentation/components/spinner */ \"./src/presentation/components/spinner/index.tsx\");\n/* harmony import */ var _presentation_contexts_form_form_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/presentation/contexts/form/form-context */ \"./src/presentation/contexts/form/form-context.ts\");\n/* harmony import */ var _login_style_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./login-style.scss */ \"./src/presentation/pages/login/login-style.scss\");\n/* harmony import */ var _presentation_contexts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/presentation/contexts */ \"./src/presentation/contexts/index.tsx\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\n\n\n\n\n\nconst Login = ({ validation, authentication }) => {\n    const { setCurrentAccount } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_presentation_contexts__WEBPACK_IMPORTED_MODULE_8__.ApiContext);\n    const history = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_9__.useHistory)();\n    const [isFormInvalid, setIsFormInvalid] = react__WEBPACK_IMPORTED_MODULE_0___default().useState(true);\n    const [stateErrors, setStateErrors] = react__WEBPACK_IMPORTED_MODULE_0___default().useState({\n        emailError: \"\",\n        passwordError: \"\",\n    });\n    const [mainError, setMainError] = react__WEBPACK_IMPORTED_MODULE_0___default().useState(\"\");\n    const [isLoading, setIsLoading] = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false);\n    const [values, setValues] = react__WEBPACK_IMPORTED_MODULE_0___default().useState({\n        email: \"\",\n        password: \"\",\n    });\n    const handleSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {\n        event.preventDefault();\n        try {\n            if (isLoading || isFormInvalid)\n                return;\n            setIsLoading(true);\n            const account = yield authentication.auth(Object.assign({}, values));\n            setCurrentAccount(account);\n            history.replace(\"/\");\n        }\n        catch (error) {\n            setMainError(error.message);\n            setIsLoading(false);\n        }\n    });\n    const validate = (field) => {\n        const formData = Object.assign({}, values);\n        const fieldError = validation.validate(field, formData);\n        setStateErrors((prevState) => (Object.assign(Object.assign({}, prevState), { [`${field}Error`]: fieldError })));\n        setIsFormInvalid(!!(stateErrors.emailError || stateErrors.passwordError || fiel));\n    };\n    react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(() => validate('email'), [values.email]);\n    react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(() => validate('password'), [values.password]);\n    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", { className: _login_style_scss__WEBPACK_IMPORTED_MODULE_7__[\"default\"].loginWrap },\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentation_components_header__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null),\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentation_contexts_form_form_context__WEBPACK_IMPORTED_MODULE_6__[\"default\"].Provider, { value: { stateErrors, values, setValues } },\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"form\", { \"data-testid\": \"form\", onSubmit: handleSubmit, className: _login_style_scss__WEBPACK_IMPORTED_MODULE_7__[\"default\"].form },\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h2\", { className: _login_style_scss__WEBPACK_IMPORTED_MODULE_7__[\"default\"].formHeader }, \"Login\"),\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentation_components_input__WEBPACK_IMPORTED_MODULE_4__[\"default\"], { type: \"email\", name: \"email\", placeholder: \"Digite seu e-mail\" }),\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentation_components_input__WEBPACK_IMPORTED_MODULE_4__[\"default\"], { type: \"password\", name: \"password\", placeholder: \"Digite sua senha\" }),\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", { className: _login_style_scss__WEBPACK_IMPORTED_MODULE_7__[\"default\"].buttonContainer },\n                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentation_components_button__WEBPACK_IMPORTED_MODULE_1__[\"default\"], { \"data-testid\": \"submit-form\", variant: \"filled\", disabled: isFormInvalid, type: \"submit\" }, \"Entrar\"),\n                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", { \"data-testid\": \"status-wrap\" },\n                        isLoading && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentation_components_spinner__WEBPACK_IMPORTED_MODULE_5__[\"default\"], null),\n                        mainError && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", { \"data-testid\": \"main-error\" }, mainError)),\n                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Link, { to: \"/signup\" },\n                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentation_components_button__WEBPACK_IMPORTED_MODULE_1__[\"default\"], { variant: \"outlined\" }, \"Criar conta\"))))),\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_presentation_components_footer__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null)));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Login);\n\n\n//# sourceURL=webpack://clean_arquiteture_tdd/./src/presentation/pages/login/index.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("268728d4b749f11294df")
/******/ })();
/******/ 
/******/ }
);