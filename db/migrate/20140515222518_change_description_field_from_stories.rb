class ChangeDescriptionFieldFromStories < ActiveRecord::Migration
  def change
    change_column :stories, :description,  :text
  end
end
