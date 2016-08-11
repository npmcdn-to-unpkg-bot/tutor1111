module.exports = function (grunt) {

    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                //定义一个用于插入合并输出文件之间的字符
                separator: ''
            },
            dist: {
                //用于连接的文件
                src: ['src/*.js', 'src/**/*.js'],
                //返回的JS文件位置
                dest: 'public/javascripts/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                //生成一个banner注释并插入到输出文件的顶部
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'public/javascripts/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        watch: {
            files: ['src/**/*.js', 'src/**/**/*.js'],
            tasks: ['concat', 'uglify']
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['concat', 'uglify']);

    grunt.registerTask('deploy', [
        'ngtemplates',
        'concat',
        'uglify',
        'shell:pkg',
        'sshexec:clearUpload',
        'sftp:upload'
    ]);

    //<editor-fold desc="grunt view:system.Group">
    grunt.registerTask('view', function (path) {
        var _ = require('lodash'),
            model=path.split('.')[1];
        var template, contents;

        //<editor-fold desc="CtrlForm">
        template = grunt.file.read('tpl/ctrl.ejs');
        contents = grunt.template.process(template, {
            data: {
                modelName: model
            }
        });
        grunt.file.write('src/controller/' + path.replace('.', '/') + 'Ctrl.js', contents);
        //</editor-fold>

        //<editor-fold desc="NewForm">
        template = grunt.file.read('tpl/view/new.ejs');
        contents = grunt.template.process(template, {
            data: {
                modelName: model
            }
        });
        grunt.file.write('public/views/' + path.replace('.', '/') + '/new.html', contents);

        //</editor-fold>

        //<editor-fold desc="EditForm">
        template = grunt.file.read('tpl/view/edit.ejs');
        contents = grunt.template.process(template, {
            data: {
                modelName: model
            }
        });
        grunt.file.write('public/views/' + path.replace('.', '/') + '/edit.html', contents);
        //</editor-fold>

        //<editor-fold desc="ViewForm">
        template = grunt.file.read('tpl/view/display.ejs');
        contents = grunt.template.process(template, {
            data: {
                modelName: model
            }
        });
        grunt.file.write('public/views/' + path.replace('.', '/') + '/view.html', contents);
        //</editor-fold>
    });
    //</editor-fold>
};
