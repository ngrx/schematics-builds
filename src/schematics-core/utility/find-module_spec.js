(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/schematics-core/utility/find-module_spec", ["require", "exports", "@angular-devkit/schematics", "@ngrx/schematics/src/schematics-core/utility/find-module"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var schematics_1 = require("@angular-devkit/schematics");
    var find_module_1 = require("@ngrx/schematics/src/schematics-core/utility/find-module");
    describe('find-module', function () {
        describe('findModule', function () {
            var host;
            var modulePath = '/foo/src/app/app.module.ts';
            beforeEach(function () {
                host = new schematics_1.EmptyTree();
                host.create(modulePath, 'app module');
            });
            it('should find a module', function () {
                var foundModule = find_module_1.findModule(host, 'foo/src/app/bar');
                expect(foundModule).toEqual(modulePath);
            });
            it('should not find a module in another sub dir', function () {
                host.create('/foo/src/app/buzz/buzz.module.ts', 'app module');
                var foundModule = find_module_1.findModule(host, 'foo/src/app/bar');
                expect(foundModule).toEqual(modulePath);
            });
            it('should ignore routing modules', function () {
                host.create('/foo/src/app/app-routing.module.ts', 'app module');
                var foundModule = find_module_1.findModule(host, 'foo/src/app/bar');
                expect(foundModule).toEqual(modulePath);
            });
            it('should work with weird paths', function () {
                host.create('/foo/src/app/app-routing.module.ts', 'app module');
                var foundModule = find_module_1.findModule(host, 'foo//src//app/bar/');
                expect(foundModule).toEqual(modulePath);
            });
            it('should throw if no modules found', function () {
                host.create('/foo/src/app/oops.module.ts', 'app module');
                try {
                    find_module_1.findModule(host, 'foo/src/app/bar');
                    throw new Error('Succeeded, should have failed');
                }
                catch (err) {
                    expect(err.message).toMatch(/More than one module matches/);
                }
            });
            it('should throw if two modules found', function () {
                try {
                    host = new schematics_1.EmptyTree();
                    find_module_1.findModule(host, 'foo/src/app/bar');
                    throw new Error('Succeeded, should have failed');
                }
                catch (err) {
                    expect(err.message).toMatch(/Could not find an NgModule/);
                }
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC1tb2R1bGVfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc2NoZW1hdGljcy9zcmMvc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvZmluZC1tb2R1bGVfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBOzs7Ozs7T0FNRztJQUNILHlEQUE2RDtJQUM3RCx3RkFBMkM7SUFFM0MsUUFBUSxDQUFDLGFBQWEsRUFBRTtRQUN0QixRQUFRLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksSUFBVSxDQUFDO1lBQ2YsSUFBTSxVQUFVLEdBQUcsNEJBQTRCLENBQUM7WUFDaEQsVUFBVSxDQUFDO2dCQUNULElBQUksR0FBRyxJQUFJLHNCQUFTLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsc0JBQXNCLEVBQUU7Z0JBQ3pCLElBQU0sV0FBVyxHQUFHLHdCQUFVLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7Z0JBQ3hELE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsNkNBQTZDLEVBQUU7Z0JBQ2hELElBQUksQ0FBQyxNQUFNLENBQUMsa0NBQWtDLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzlELElBQU0sV0FBVyxHQUFHLHdCQUFVLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7Z0JBQ3hELE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsK0JBQStCLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsb0NBQW9DLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ2hFLElBQU0sV0FBVyxHQUFHLHdCQUFVLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7Z0JBQ3hELE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsOEJBQThCLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsb0NBQW9DLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ2hFLElBQU0sV0FBVyxHQUFHLHdCQUFVLENBQUMsSUFBSSxFQUFFLG9CQUFvQixDQUFDLENBQUM7Z0JBQzNELE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsa0NBQWtDLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsNkJBQTZCLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3pELElBQUksQ0FBQztvQkFDSCx3QkFBVSxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO29CQUNwQyxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7Z0JBQ25ELENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDYixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO2dCQUM5RCxDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsbUNBQW1DLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQztvQkFDSCxJQUFJLEdBQUcsSUFBSSxzQkFBUyxFQUFFLENBQUM7b0JBQ3ZCLHdCQUFVLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7b0JBQ3BDLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztnQkFDbkQsQ0FBQztnQkFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNiLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7Z0JBQzVELENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBFbXB0eVRyZWUsIFRyZWUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgeyBmaW5kTW9kdWxlIH0gZnJvbSAnLi9maW5kLW1vZHVsZSc7XG5cbmRlc2NyaWJlKCdmaW5kLW1vZHVsZScsICgpID0+IHtcbiAgZGVzY3JpYmUoJ2ZpbmRNb2R1bGUnLCAoKSA9PiB7XG4gICAgbGV0IGhvc3Q6IFRyZWU7XG4gICAgY29uc3QgbW9kdWxlUGF0aCA9ICcvZm9vL3NyYy9hcHAvYXBwLm1vZHVsZS50cyc7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBob3N0ID0gbmV3IEVtcHR5VHJlZSgpO1xuICAgICAgaG9zdC5jcmVhdGUobW9kdWxlUGF0aCwgJ2FwcCBtb2R1bGUnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZmluZCBhIG1vZHVsZScsICgpID0+IHtcbiAgICAgIGNvbnN0IGZvdW5kTW9kdWxlID0gZmluZE1vZHVsZShob3N0LCAnZm9vL3NyYy9hcHAvYmFyJyk7XG4gICAgICBleHBlY3QoZm91bmRNb2R1bGUpLnRvRXF1YWwobW9kdWxlUGF0aCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCBmaW5kIGEgbW9kdWxlIGluIGFub3RoZXIgc3ViIGRpcicsICgpID0+IHtcbiAgICAgIGhvc3QuY3JlYXRlKCcvZm9vL3NyYy9hcHAvYnV6ei9idXp6Lm1vZHVsZS50cycsICdhcHAgbW9kdWxlJyk7XG4gICAgICBjb25zdCBmb3VuZE1vZHVsZSA9IGZpbmRNb2R1bGUoaG9zdCwgJ2Zvby9zcmMvYXBwL2JhcicpO1xuICAgICAgZXhwZWN0KGZvdW5kTW9kdWxlKS50b0VxdWFsKG1vZHVsZVBhdGgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBpZ25vcmUgcm91dGluZyBtb2R1bGVzJywgKCkgPT4ge1xuICAgICAgaG9zdC5jcmVhdGUoJy9mb28vc3JjL2FwcC9hcHAtcm91dGluZy5tb2R1bGUudHMnLCAnYXBwIG1vZHVsZScpO1xuICAgICAgY29uc3QgZm91bmRNb2R1bGUgPSBmaW5kTW9kdWxlKGhvc3QsICdmb28vc3JjL2FwcC9iYXInKTtcbiAgICAgIGV4cGVjdChmb3VuZE1vZHVsZSkudG9FcXVhbChtb2R1bGVQYXRoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgd29yayB3aXRoIHdlaXJkIHBhdGhzJywgKCkgPT4ge1xuICAgICAgaG9zdC5jcmVhdGUoJy9mb28vc3JjL2FwcC9hcHAtcm91dGluZy5tb2R1bGUudHMnLCAnYXBwIG1vZHVsZScpO1xuICAgICAgY29uc3QgZm91bmRNb2R1bGUgPSBmaW5kTW9kdWxlKGhvc3QsICdmb28vL3NyYy8vYXBwL2Jhci8nKTtcbiAgICAgIGV4cGVjdChmb3VuZE1vZHVsZSkudG9FcXVhbChtb2R1bGVQYXRoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgaWYgbm8gbW9kdWxlcyBmb3VuZCcsICgpID0+IHtcbiAgICAgIGhvc3QuY3JlYXRlKCcvZm9vL3NyYy9hcHAvb29wcy5tb2R1bGUudHMnLCAnYXBwIG1vZHVsZScpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZmluZE1vZHVsZShob3N0LCAnZm9vL3NyYy9hcHAvYmFyJyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU3VjY2VlZGVkLCBzaG91bGQgaGF2ZSBmYWlsZWQnKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBleHBlY3QoZXJyLm1lc3NhZ2UpLnRvTWF0Y2goL01vcmUgdGhhbiBvbmUgbW9kdWxlIG1hdGNoZXMvKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgaWYgdHdvIG1vZHVsZXMgZm91bmQnLCAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBob3N0ID0gbmV3IEVtcHR5VHJlZSgpO1xuICAgICAgICBmaW5kTW9kdWxlKGhvc3QsICdmb28vc3JjL2FwcC9iYXInKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdWNjZWVkZWQsIHNob3VsZCBoYXZlIGZhaWxlZCcpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGV4cGVjdChlcnIubWVzc2FnZSkudG9NYXRjaCgvQ291bGQgbm90IGZpbmQgYW4gTmdNb2R1bGUvKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==