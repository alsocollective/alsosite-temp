from django.contrib import admin
from also.models import ImageNode, TextNode, Category, Article, InstaPost, Post, Day



class ArticleAdmin(admin.ModelAdmin):
	list_display = ('title','selected','order','project_type','short_description','main_image','image','text','showCat')
	list_editable = ('selected','order','project_type','short_description','main_image',)
	filter_horizontal = ('textFields','imageFields','instagramFields',)
	readonly_fields = ('image',)
	# ordering = ('title',)



	fieldsets = [
		(None,{'fields':[('title','selected','order'),'project_type','short_description',('main_image','image'),'category','date','textFields','imageFields']}),
		('Advance options', {
			'classes':('collapse',),
			'fields':('instagramFields','slug',)
			}),
	]

class Image(admin.ModelAdmin):
	list_display = ('title', 'order','homepage','admin_image','admin_video')
	list_editable = ('order','homepage',)
	# ordering = ('title',)
	fieldsets = [
		(None,{'fields':['location','video','url','order']}),
		('Advance options', {
			'classes':('collapse',),
			'fields':('description','title')
			}),
	]

class Insta(admin.ModelAdmin):
	list_display = ('creator','instaImage','display','date')
	fieldsets = [(None,{'fields':['display','creator','date']})]

class TextAdmin(admin.ModelAdmin):
	list_display = ('title', 'date')


admin.site.register(ImageNode,Image)
admin.site.register(TextNode,TextAdmin)
admin.site.register(Category)
admin.site.register(Article,ArticleAdmin)
admin.site.register(InstaPost,Insta)
admin.site.register(Post)
# admin.site.register(Day)
