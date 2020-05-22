import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// 自动生成文档, {{baseURL}}/swagger, 例如 http://localhost:3000/swagger/v1
export const swagger = function(app) {
    if (process.env.NODE_ENV === 'production') {
        return;
    }

    const v1Opts = new DocumentBuilder()
        .setTitle('招聘小程序 v1')
        .setDescription('Check In API Documents')
        .setVersion('1.0')
        .addTag('/', 'application')
        .addTag('admin', '管理后台')
        .addTag('user', '用户')
        .addTag('auth', '认证')
        .addTag('monitor', '前端监控')
        .addTag('card', '卡片')
        .addTag('email', '邮件')
        .addTag('feedback', '意见反馈')
        .addTag('mini-qq', 'qq小程序')
        .addTag('mini-wechat', '微信小程序')
        .addTag('mini-alipay', '支付宝小程序')
        .addTag('mini-bytedance', '字节跳动小程序')
        .addTag('web-qq', '网页qq')
        .addTag('default', '其他')
        .addBearerAuth({
            type: 'http',
            name: 'jwt',
            description: 'jwt',
        })
        .build();

    SwaggerModule.setup('swagger/v1', app, SwaggerModule.createDocument(app, v1Opts));
};
